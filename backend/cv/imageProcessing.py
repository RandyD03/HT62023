# Functions for processing an image and determining the bounding box

from scipy.spatial import distance as dist
from imutils import perspective
from imutils import contours
import numpy as np
from imutils import perspective
import argparse
import imutils
import cv2

def midPoint(ptA, ptB):
	return ((ptA[0] + ptB[0]) * 0.5, (ptA[1] + ptB[1]) * 0.5)

# width of the top-most object used for reference measurements in centimetres
REFERENCE_WIDTH = 10


def getObjectMidpoint(image):
    #convert image to grayscale, and blur it slightly
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  
    gray = cv2.GaussianBlur(gray, (7, 7), 0)

    # perform edge detection, then perform a dilation + erosion to
    # close gaps in between object edges
    edged = cv2.Canny(gray, 50, 100)
    edged = cv2.dilate(edged, None, iterations=1)
    edged = cv2.erode(edged, None, iterations=1)

    # find contours in the edge map
    cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)

    # sort the contours from left-to-right and initialize the
    # 'pixels per metric' calibration variable
    (cnts, _) = contours.sort_contours(cnts)
    pixelsPerCenti = None

    # loop over the contours individually
    for c in cnts:
        # if the contour is not sufficiently large, ignore it
        if cv2.contourArea(c) < 100:
            continue

        # compute the rotated bounding box of the contour
        orig = image.copy()
        box = cv2.minAreaRect(c)
        box = cv2.cv.BoxPoints(box) if imutils.is_cv2() else cv2.boxPoints(box)
        box = np.array(box, dtype="int")

        # order the points in the contour such that they appear
        # in top-left, top-right, bottom-right, and bottom-left
        # order, then draw the outline of the rotated bounding
        # box
        box = perspective.order_points(box)
        cv2.drawContours(orig, [box.astype("int")], -1, (0, 255, 0), 2)

        # loop over the original points and draw them
        for (x, y) in box:
		    cv2.circle(orig, (int(x), int(y)), 5, (0, 0, 255), -1)

CONVOLUTION_KERNEL = (5, 5)
REF_OBJECT_WIDTH = 5
REF_OBJECT_HEIGHT = 5
REF_OBJECT_LENGTH = 5

# Take an image and identify the contours of the image
def get_contours(
    img, cThr=[100, 100], filter=0
):  # lower thresholds will result in consideration of weaker outlines

    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  # to grayscale

    imgBlur = cv2.GaussianBlur(
        imgGray, CONVOLUTION_KERNEL, 1
    )  # smooth out image with 5x5 convolution

    imgCanny = cv2.Canny(
        imgBlur, cThr[0], cThr[1]
    )  # define thresholds between objects in the image (outlines of all major objects)

    imgDial = cv2.dilate(
        imgCanny, CONVOLUTION_KERNEL, iterations=3
    )  # Increase the size of bright regions and decrease size of dark regions by pooling a convolution
    imgThre = cv2.erode(
        imgDial, CONVOLUTION_KERNEL, iterations=2
    )  # Increase size of dark regions and decrease size of bright regions

    contours, hierarchy = cv2.findContours(
        imgThre, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
    )  # retrieve contours on a binary image

    itemContours = []

    for c in contours:
        area = cv2.contourArea(c)
        if area < 1000:  # 1000 is minimum area
            continue

        peri = cv2.arcLength(c, True)  # get perimeter
        approx = cv2.approxPolyDP(
            c, 0.02 * peri, True
        )  # simplifies the contour by reducing no. of vertices
        bbox = perspective.order_points(
            cv2.boxPoints(cv2.minAreaRect(approx))
        )  # create bounding box

        if filter > 0:
            if len(approx) == filter:
                itemContours.append([len(approx), area, approx, bbox, c])
        else:
            itemContours.append([len(approx), area, approx, bbox, c])

    itemContours = sorted(
        itemContours, key=lambda x: x[1], reverse=True
    )  # sort by area in descending order

    # Draw contours on the original image
    for contour in itemContours:
        cv2.drawContours(img, [contour[3].astype("int")], -1, (0, 0, 255), 3)

    return img, itemContours


img = cv2.imread("test.jpg")
img, itemContours = get_contours(img)
cv2.imshow("item", img)
cv2.waitKey(10000)
if len(itemContours) > 0:
    biggest = itemContours[0][
        2
    ]  # Get the simplified contour of the largest item contour

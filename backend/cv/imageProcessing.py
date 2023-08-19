# Functions for processing an image and determining the bounding box

from scipy.spatial import distance as dist
from imutils import perspective
from imutils import contours
import numpy as np
from imutils import perspective
import argparse
import imutils
import cv2

def midpoint(ptA, ptB):
	return ((ptA[0] + ptB[0]) * 0.5, (ptA[1] + ptB[1]) * 0.5)

# width of the top-most object used for reference measurements in centimetres
REFERENCE_WIDTH = 10







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

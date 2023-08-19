# Functions for processing an image and determining the bounding box

import cv2
import numpy as np

CONVOLUTION_KERNEL = (5, 5)

# Take an image and identify the contours of the image
def get_contours(
    img, cThr=[20, 20], filter=0
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
        if area > 1000:
            peri = cv2.arcLength(c, True)  # get perimeter
            approx = cv2.approxPolyDP(
                c, 0.02 * peri, True
            )  # simplifies the contour by reducing no. of vertices
            bbox = cv2.boundingRect(approx)  # create bounding box
            if filter > 0:
                if len(approx) == filter:
                    itemContours.append(len(approx), area, approx)

    # while True:
    #     cv2.imshow("canny", imgThre)
    #     cv2.waitKey(1)


img = cv2.imread("test.jpg")
get_contours(img)

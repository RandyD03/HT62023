# Functions for processing an image and determining the bounding box

from scipy.spatial import distance as dist
from imutils import perspective
from imutils import contours
import numpy as np
from imutils import perspective
import argparse
import imutils
import cv2
import base64
import json
import uuid

# width of the top-most object used for reference measurements in centimetres
REFERENCE_WIDTH = 11.5


class Response:
    def __init__(self, dimensions, uniqueID, frontResult, sideResult):
        self.dimensions = dimensions
        self.uniqueID = uniqueID
        self.frontResult = frontResult
        self.sideResult = sideResult


def midPoint(ptA, ptB):
    return ((ptA[0] + ptB[0]) * 0.5, (ptA[1] + ptB[1]) * 0.5)


def decodeImages(base):
    # decode base64 string data -- [front, side]

    decoded_data = [base64.b64decode(base[0]), base64.b64decode(base[1])]

    # write the decoded data back to original format in  file
    front_image_np_array = np.frombuffer(decoded_data[0], dtype=np.uint8)
    side_image_np_array = np.frombuffer(decoded_data[1], dtype=np.uint8)

    return [
        cv2.imdecode(front_image_np_array, flags=cv2.IMREAD_COLOR),
        cv2.imdecode(side_image_np_array, flags=cv2.IMREAD_COLOR),
    ]


def convertThreeDimension(d_one, d_two):
    # d_one: [Width, Height], d_two: [Length, Height]
    return [d_one[0], d_two[0], max(d_one[1], d_two[1])]


def getObjectMeasurement(image):
    # convert image to grayscale, and blur it slightly
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (7, 7), 0)

    # perform edge detection, then perform a dilation + erosion to
    # close gaps in between object edges
    edged = cv2.Canny(gray, 50, 100)
    edged = cv2.dilate(edged, None, iterations=1)
    edged = cv2.erode(edged, None, iterations=1)

    # find contours in the edge map
    cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)

    # sort the contours from top-to-bottom and initialize the
    # 'pixels per centimetre' calibration variable
    (cnts, _) = contours.sort_contours(cnts, "top-to-bottom")
    cnts = sorted(cnts[1:], key=lambda c: cv2.contourArea(c), reverse=True)

    pixelsPerCenti = None

    # Find the top most contour to find reference width
    c = cnts[0]
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

    # unpack the ordered bounding box, then compute the midpoint
    # between the top-left and top-right coordinates, followed by
    # the midpoint between bottom-left and bottom-right coordinates
    (tl, tr, br, bl) = box
    (tltrX, tltrY) = midPoint(tl, tr)
    (blbrX, blbrY) = midPoint(bl, br)
    # compute the midpoint between the top-left and top-right points,
    # followed by the midpoint between the top-righ and bottom-right
    (tlblX, tlblY) = midPoint(tl, bl)
    (trbrX, trbrY) = midPoint(tr, br)
    # draw the midpoints on the image
    cv2.circle(orig, (int(tltrX), int(tltrY)), 5, (255, 0, 0), -1)
    cv2.circle(orig, (int(blbrX), int(blbrY)), 5, (255, 0, 0), -1)
    cv2.circle(orig, (int(tlblX), int(tlblY)), 5, (255, 0, 0), -1)
    cv2.circle(orig, (int(trbrX), int(trbrY)), 5, (255, 0, 0), -1)
    # draw lines between the midpoints
    cv2.line(orig, (int(tltrX), int(tltrY)), (int(blbrX), int(blbrY)), (255, 0, 255), 2)
    cv2.line(orig, (int(tlblX), int(tlblY)), (int(trbrX), int(trbrY)), (255, 0, 255), 2)

    # compute the Euclidean distance between the midpoints
    dA = dist.euclidean((tltrX, tltrY), (blbrX, blbrY))
    dB = dist.euclidean((tlblX, tlblY), (trbrX, trbrY))

    # compute it as the ratio of pixels to centimetres
    pixelsPerCenti = dB / REFERENCE_WIDTH

    # compute the size of the object
    dimA = dA / pixelsPerCenti
    dimB = dB / pixelsPerCenti

    # draw the object sizes on the image
    cv2.putText(
        orig,
        "{:.1f}cm".format(dimA),
        (int(tltrX - 15), int(tltrY - 10)),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.65,
        (255, 255, 255),
        2,
    )
    cv2.putText(
        orig,
        "{:.1f}cm".format(dimB),
        (int(trbrX + 10), int(trbrY)),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.65,
        (255, 255, 255),
        2,
    )

    cv2.imwrite(f"imgStore/ref{dB}.jpg", orig)

    c = cnts[1]
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

    # unpack the ordered bounding box, then compute the midpoint
    # between the top-left and top-right coordinates, followed by
    # the midpoint between bottom-left and bottom-right coordinates
    (tl, tr, br, bl) = box
    (tltrX, tltrY) = midPoint(tl, tr)
    (blbrX, blbrY) = midPoint(bl, br)
    # compute the midpoint between the top-left and top-right points,
    # followed by the midpoint between the top-righ and bottom-right
    (tlblX, tlblY) = midPoint(tl, bl)
    (trbrX, trbrY) = midPoint(tr, br)
    # draw the midpoints on the image
    cv2.circle(orig, (int(tltrX), int(tltrY)), 5, (255, 0, 0), -1)
    cv2.circle(orig, (int(blbrX), int(blbrY)), 5, (255, 0, 0), -1)
    cv2.circle(orig, (int(tlblX), int(tlblY)), 5, (255, 0, 0), -1)
    cv2.circle(orig, (int(trbrX), int(trbrY)), 5, (255, 0, 0), -1)
    # draw lines between the midpoints
    cv2.line(orig, (int(tltrX), int(tltrY)), (int(blbrX), int(blbrY)), (255, 0, 255), 2)
    cv2.line(orig, (int(tlblX), int(tlblY)), (int(trbrX), int(trbrY)), (255, 0, 255), 2)

    # compute the Euclidean distance between the midpoints
    dA = dist.euclidean((tltrX, tltrY), (blbrX, blbrY))
    dB = dist.euclidean((tlblX, tlblY), (trbrX, trbrY))

    # compute the size of the object
    dimA = dA / pixelsPerCenti
    dimB = dB / pixelsPerCenti

    # draw the object sizes on the image
    cv2.putText(
        orig,
        "{:.1f}cm".format(dimA),
        (int(tltrX - 15), int(tltrY - 10)),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.65,
        (255, 255, 255),
        2,
    )
    cv2.putText(
        orig,
        "{:.1f}cm".format(dimB),
        (int(trbrX + 10), int(trbrY)),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.65,
        (255, 255, 255),
        2,
    )

    # show the output image
    # cv2.imshow("Image", orig)
    # cv2.waitKey(5000)

    payload = [[dimB, dimA], orig]
    return payload


# Unpacks API load and processes all image sets, returns dimensions of all objects
# to be sent to the algorithm -- imagePairs is a list of base64 pairs and unique id #
def processAllImages(imagePairs):
    # objectDimensions: [{w,l,h}, unique id #, [opencv front, opencv side]]
    for pair in imagePairs:
        # images: [front image, side image]
        images = decodeImages([pair[0], pair[1]])

        # dimensions: [[dimB, dimA], orig]
        frontDimensions = getObjectMeasurement(images[0])
        sideDimensions = getObjectMeasurement(images[1])

        front_filename = f"front.jpg"
        side_filename = f"side.jpg"

        cv2.imwrite(f"imgStore/{front_filename}", frontDimensions[1])
        cv2.imwrite(f"imgStore/{side_filename}", sideDimensions[1])

        curResult = {
            "dimensions": convertThreeDimension(frontDimensions[0], sideDimensions[0]),
            "frontImg": front_filename,
            "sideImg": side_filename,
        }

    return curResult


# with open("test.jpeg", "rb") as f:
#     base1 = base64.b64encode(f.read())

# dimensions = processAllImages([[base1, base1]])
# print(dimensions[0], "  ", dimensions[1])

# image_data = base64.b64decode(base1)

# # Convert the binary data to a NumPy array
# image_array = np.frombuffer(image_data, np.uint8)

# # Decode the NumPy array as an image using OpenCV
# image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

# # Display the image using OpenCV
# cv2.imshow("Image", image)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

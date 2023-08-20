from box import Box
from item import Item
import py3dbp

INFINITY = 100000000


class Classifier:
    def __init__(self, items, boxes):
        self.items = items
        self.boxes = boxes

    def add_box(self, box: Box):
        self.boxes.append(box)

    def add_item(self, item: Item):
        self.items.append(item)

    def print_items(self):
        for item in self.items:
            print(f"Name: {item.name}")
            item.print_info()

    def print_boxes(self):
        for box in self.boxes:
            box.print_info()

    def fit_items_to_box(self, items, box):
        packer = py3dbp.Packer()

        packer.add_bin(
            py3dbp.Bin(box.name, box.width, box.length, box.height, 0, INFINITY)
        )
        for item in items:
            packer.add_item(
                py3dbp.Item(box.name, item.width, item.height, item.length, 0)
            )

        packer.pack()
        # There should only be one bin
        for bin in packer.bins:
            if len(bin.unfitted_items) != 0:
                return {"arrangement": [], "cost": INFINITY}
            else:
                cost = box.get_volume() - sum([item.get_volume() for item in bin.items])
                return {
                    "arrangement": [item.string() for item in bin.items],
                    "cost": cost,
                }

    def classify(self, start_ind, end_ind):
        """
        start_ind: starting index of items being considered
        end_ind: ending index of items being considered
        """
        best_arrangement = {"arrangement": [], "cost": INFINITY}

        # put all current items into one box
        for box in self.boxes:
            all_in_one = self.fit_items_to_box(self.items[start_ind : end_ind + 1], box)

        if start_ind == end_ind:
            return best_arrangement

        # partition
        for i in range(start_ind, end_ind + 1):
            left = self.classify(self, start_ind, i)
            right = self.classify(self, i + 1, end_ind)
            # merge
            if left["cost"] + right["cost"] < best_arrangement["cost"]:
                best_arrangement["arrangement"] = [
                    left["arrangement"],
                    right["arrangement"],
                ]
                best_arrangement["cost"] = left["cost"] + right["cost"]

        return best_arrangement


def packItems(items, boxes):
    packer = py3dbp.Packer()

    for box in boxes:
        packer.add_bin(
            py3dbp.Bin(box.name, box.width, box.height, box.length, INFINITY)
        )

    for item in items:
        packer.add_item(py3dbp.Item(item.name, item.width, item.height, item.length, 0))

    packer.pack(distribute_items=True)

    boxes = [None] * len(boxes)
    items = [[]] * len(items)

    for b in packer.bins:
        pass


def main():
    # items = [Item(1, 2, 3, "item1"), Item(4, 5, 6, "item2")]
    # boxes = [Box(10, 20, 30, "box1"), Box(100, 200, 300, "box1")]
    # classifier = Classifier(
    #     items,
    #     boxes,
    # )
    # print(classifier.classify(0, len(items) - 1))
    # item1 = Item(1, 2, 3, "")
    # item2 = Item(4, 5, 6, "")
    # res = []
    # Box.permute_items_orientation(0, [item1, item2], res)
    # for items in res:
    #     for item in items:
    #         item.print_info()
    packer = py3dbp.Packer()

    packer.add_bin(py3dbp.Bin("small-envelope", 11.5, 6.125, 0.25, 10))
    packer.add_bin(py3dbp.Bin("large-envelope", 15.0, 12.0, 0.75, 15))
    packer.add_bin(py3dbp.Bin("small-box", 8.625, 5.375, 1.625, 70.0))
    packer.add_bin(py3dbp.Bin("medium-box", 11.0, 8.5, 5.5, 70.0))
    packer.add_bin(py3dbp.Bin("medium-2-box", 13.625, 11.875, 3.375, 70.0))
    packer.add_bin(py3dbp.Bin("large-box", 12.0, 12.0, 5.5, 70.0))
    packer.add_bin(py3dbp.Bin("large-2-box", 23.6875, 11.75, 3.0, 70.0))

    packer.add_item(py3dbp.Item("50g [powder 1]", 3.9370, 1.9685, 1.9685, 1))
    packer.add_item(py3dbp.Item("50g [powder 2]", 3.9370, 1.9685, 1.9685, 2))
    packer.add_item(py3dbp.Item("50g [powder 3]", 3.9370, 1.9685, 1.9685, 3))
    packer.add_item(py3dbp.Item("250g [powder 4]", 7.8740, 3.9370, 1.9685, 4))
    packer.add_item(py3dbp.Item("250g [powder 5]", 7.8740, 3.9370, 1.9685, 5))
    packer.add_item(py3dbp.Item("250g [powder 6]", 7.8740, 3.9370, 1.9685, 6))
    packer.add_item(py3dbp.Item("250g [powder 7]", 7.8740, 3.9370, 1.9685, 7))
    packer.add_item(py3dbp.Item("250g [powder 8]", 7.8740, 3.9370, 1.9685, 8))
    packer.add_item(py3dbp.Item("250g [powder 9]", 7.8740, 3.9370, 1.9685, 9))

    packer.pack(distribute_items=True)

    for b in packer.bins:
        print(":::::::::::", b.string())

        print("FITTED ITEMS:")
        for item in b.items:
            print("====> ", item.string())

        print("UNFITTED ITEMS:")
        for item in b.unfitted_items:
            print("====> ", item.string())

        print("***************************************************")
        print("***************************************************")

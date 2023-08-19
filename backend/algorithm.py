class Object3D:
    def __init__(self, width: int, length: int, height: int):
        self.width = width
        self.length = length
        self.height = height

    def rotate(self):
        self.width, self.length, self.height = self.length, self.height, self.width

    def print_info(self):
        print(f"Width: {self.width}")
        print(f"Length: {self.length}")
        print(f"Height: {self.height}")


class Box(Object3D):
    def __init__(self, width, length, height):
        super().__init__(width, length, height)


class Item(Object3D):
    def __init__(self, width, length, height, name):
        super().__init__(width, length, height)
        self.name = name

    def can_fit(self, box: Box):
        return (
            self.width <= box.width
            and self.height <= box.height
            and self.length <= box.length
        )


class Classifier:
    def __init__(self, items: list[Item], boxes: list[Box]):
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

    # TODO
    def fit_items_to_box(self, items: list[Item], box: Box):
        pass

    def classify(self, start_ind, end_ind):
        # find most optimal box for one item
        if start_ind == end_ind:
            for box in self.boxes:
        for i in range(start_ind, end_ind + 1):
            self.classify(self, start_ind, i)
            self.classify(self, i + 1, end_ind)

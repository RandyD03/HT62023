class Object3D:
    def __init__(self, width, length, height, name):
        self.width = width
        self.length = length
        self.height = height
        self.name = name

    def rotate(self):
        self.width, self.length, self.height = self.length, self.height, self.width

    def print_info(self):
        print(f"Width: {self.width}")
        print(f"Length: {self.length}")
        print(f"Height: {self.height}")

    def get_volume(self):
        return self.width * self.height * self.length

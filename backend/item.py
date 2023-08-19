from object3d import Object3D


class Item(Object3D):
    def __init__(self, width, length, height, name):
        super().__init__(width, length, height, name)

    def can_fit(self, box):
        return (
            self.width <= box.width
            and self.height <= box.height
            and self.length <= box.length
        )

    def remaining_volume(self, box):
        return box.get_volume() - self.get_volume

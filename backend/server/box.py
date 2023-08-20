from object3d import Object3D


class Box(Object3D):
    def __init__(self, width, length, height, name):
        super().__init__(width, length, height, name)

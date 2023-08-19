def twod_to_threed(d_one: list[int][int], d_two: list[int][int]):
    #d_one: [Width, Height], d_two: [Length, Height]
    return [d_one[0], d_two[0], max(d_one[1], d_two[1])]
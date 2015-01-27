/*global describe, it, expect */
describe('pathFinder', function () {

    function isPoint(point, x, y) {
        return point.x === x && point.y === y;
    }

    function isPointAndOneSide(point, x, y, side, sides) {
        if (isPoint(point, x, y)) {
            if (sides.indexOf(side) !== -1) {
                return true;
            }
            return false;
        }
    }

    it("should get false if the point is not contained", function () {
        var path = new PathFinder(3, 3);
        expect(path.isContained(1, 1)).toBe(false);
    });

    it("should call the method for every available square minus the starting square.", function () {

        function sidesMethod(point, side, sidePoint) {
            return true;
        }

        var rows = 3,
            cols = 3,
            called = 0,
            path = new PathFinder(rows, cols, function () {
                called += 1;
                return sidesMethod.apply(null, arguments);
            });
        path.isContained(1, 1);
        expect(called).toBe(rows * cols - 1);
    });

    it("should only return the contained squares", function () {

        function sidesMethod(point, side, sidePoint) {
            if (isPointAndOneSide(point, 2, 1, side, ['top', 'right', 'bottom'])) {
                return false;
            } else if (isPointAndOneSide(point, 1, 1, side, ['top', 'left', 'bottom'])) {
                return false;
            }
            return true;
        }

        var rows = 4,
            cols = 4,
            path = new PathFinder(rows, cols, sidesMethod),
            contained = path.isContained(1, 1, true);
        expect(contained.length).toBe(2);
    });

    it("should only return the contained squares", function () {

        function sidesMethod(point, side, sidePoint) {
            if (isPointAndOneSide(point, 2, 1, side, ['right'])) {
                return false;
            } else if (isPointAndOneSide(point, 1, 1, side, ['top', 'left', 'bottom'])) {
                return false;
            } else if (isPointAndOneSide(point, 2, 0, side, ['top', 'left', 'right'])) {
                return false;
            } else if (isPointAndOneSide(point, 2, 2, side, ['left', 'bottom'])) {
                return false;
            } else if (isPointAndOneSide(point, 3, 2, side, ['top', 'right'])) {
                return false;
            } else if (isPointAndOneSide(point, 3, 3, side, ['left', 'right'])) {
                return false;
            } else if (isPointAndOneSide(point, 3, 4, side, ['right', 'bottom'])) {
                return false;
            } else if (isPointAndOneSide(point, 2, 4, side, ['bottom', 'top'])) {
                return false;
            } else if (isPointAndOneSide(point, 1, 4, side, ['bottom', 'top'])) {
                return false;
            } else if (isPointAndOneSide(point, 0, 4, side, ['bottom', 'top','left'])) {
                return false;
            }
            return true;
        }

        var rows = 5,
            cols = 5,
            path = new PathFinder(rows, cols, sidesMethod),
            contained = path.isContained(1, 1, true);
        expect(contained.length).toBe(10);
    });

    it("should only return the contained squares", function () {

        function sidesMethod(point, side, sidePoint) {
            if (isPointAndOneSide(point, 2, 1, side, ['right'])) {
                return false;
            } else if (isPointAndOneSide(point, 1, 1, side, ['top', 'left', 'bottom'])) {
                return false;
            } else if (isPointAndOneSide(point, 2, 0, side, ['top', 'left', 'right'])) {
                return false;
            } else if (isPointAndOneSide(point, 2, 2, side, ['left', 'bottom'])) {
                return false;
            } else if (isPointAndOneSide(point, 3, 2, side, ['top', 'right'])) {
                return false;
            } else if (isPointAndOneSide(point, 3, 3, side, ['left', 'right'])) {
                return false;
            } else if (isPointAndOneSide(point, 3, 4, side, ['right', 'bottom'])) {
                return false;
            } else if (isPointAndOneSide(point, 2, 4, side, ['bottom', 'top'])) {
                return false;
            } else if (isPointAndOneSide(point, 1, 4, side, ['bottom', 'top'])) {
                return false;
            } else if (isPointAndOneSide(point, 0, 4, side, ['bottom', 'left'])) {
                return false;
            } else if (isPointAndOneSide(point, 0, 3, side, ['left', 'right'])) {
                return false;
            } else if (isPointAndOneSide(point, 0, 2, side, ['left', 'right'])) {
                return false;
            } else if (isPointAndOneSide(point, 0, 1, side, ['left', 'right'])) {
                return false;
            } else if (isPointAndOneSide(point, 0, 0, side, ['left', 'right', 'top'])) {
                return false;
            }
            return true;
        }

        var rows = 5,
            cols = 5,
            path = new PathFinder(rows, cols, sidesMethod),
            contained = path.isContained(1, 1, true);
        expect(contained.length).toBe(14);
    });
});
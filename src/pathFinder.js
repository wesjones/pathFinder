function PathFinder(rows, cols, sidesMethod) {
    var used = build(rows, cols);
    var checked = build(rows, cols);
    var deltaPoints = {
        top: new Point(0, -1),
        left: new Point(-1, 0),
        right: new Point(1, 0),
        bottom: new Point(0, 1)
    };
    var total = 0;


    function Point(x, y) {
        this.x = x;
        this.y = y;

        this.add = function(point) {
            this.x += point.x;
            this.y += point.y;
            return this;
        };

        this.clone = function() {
            return new Point(this.x, this.y);
        };
    }

    function build(rows, cols) {
        var x, y, row, board = [];
        for(y = 0; y < rows; y += 1) {
            row = [];
            for(x = 0; x < cols; x += 1) {
                row.push(0);
            }
            board.push(row);
        }
        return board;
    }

    function available(x, y) {
        if (used[y] && used[y][x] === 0) {
            if (used[y][x]) {
                return false;// if it is already used it is not available.
            }
            if (checked[y][x]) {
                return false; // if it is already checked. it is not available.
            }
            return true;
        }
        return false;
    }

    function setChecked(x, y) {
        total += 1;
        checked[y][x] = total.toString(32);
    }

    function checkPoint(point, side, fromPoint) {
        var result;
        if (available(point.x, point.y)) {
            if (sidesMethod) {
                result = sidesMethod(fromPoint, side, point);
            } else {
                result = true;
            }
            if (result) {
                setChecked(point.x, point.y);
            }
            //log(checked);
            return result;
        }
        return false;
    }

    function next(point) {
        var i,
            points = [
                {side: 'top', point: point.clone().add(deltaPoints.top)},
                {side: 'left', point: point.clone().add(deltaPoints.left)},
                {side: 'right', point: point.clone().add(deltaPoints.right)},
                {side: 'bottom', point: point.clone().add(deltaPoints.bottom)}
            ],
            len = points.length;
        for(i = 0; i < len;  i += 1) {
            if (checkPoint(points[i].point, points[i].side, point)) {
                next(points[i].point);
            }
        }
    }

    function isContained(x, y, logValue) {
        total = 0;
        checked = build(rows, cols);
        var point = new Point(x, y);
        if (available(point.x, point.y)) {
            setChecked(point.x, point.y);
            next(point);
        }
        var availablePoints = getAvailable(used, true);
        var contained = getAvailable(checked);
        if (logValue) {
            log(checked);
        }
        if (availablePoints.length > contained.length) {
            return contained;
        }
        return false;
    }

    function getAvailable(board, inverse) {
        var x, y, len = board.length, contained = [];
        for(y = 0; y < len; y += 1) {
            for(x = 0; x < board[y].length; x += 1) {
                if (board[y][x] || (inverse && !board[y][x])) {
                    contained.push(new Point(x, y));
                }
            }
        }
        return contained;
    }

    function log(board) {
        var str = '', y, len = board.length;
        for(y = 0; y < len; y += 1) {
            str += "\t" + board[y].join(" ") + "\n";
        }
        console.log(str.toUpperCase());
    }

    this.log = log;
    this.isContained = isContained;

}
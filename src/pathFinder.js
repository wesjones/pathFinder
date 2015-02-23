function PathFinder(rows, cols, sidesMethod) {
    var used = build(rows, cols);
    var checked = build(rows, cols);
    var deltaPoints = [
        new Point(0, -1),
        new Point(-1, 0),
        new Point(1, 0),
        new Point(0, 1)
    ];
    deltaPoints.top = deltaPoints[0];
    deltaPoints.left = deltaPoints[1];
    deltaPoints.right = deltaPoints[2];
    deltaPoints.bottom = deltaPoints[3];
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
        } else if (used[y] === undefined || used[y][x] === undefined) {
            return -1;
        }
        return false;
    }

    function setChecked(x, y) {
        if (checked[y] && checked[y][x] !== undefined) {
            total += 1;
            checked[y][x] = total.toString(32);
        }
    }

    function checkPoint(point, side, fromPoint) {
        var result, avail;
        if ((avail = available(point.x, point.y))) {
            if (sidesMethod) {
                result = sidesMethod(fromPoint, side, point);
            } else {
                result = true;
            }
            if (result && avail !== -1) {
                setChecked(point.x, point.y);
            }
            //log(checked);
            return result;
        }
        return false;
    }

    function next(point) {
        var i,
            value,
            points = [
                {side: 'top', point: point.clone().add(deltaPoints.top)},
                {side: 'left', point: point.clone().add(deltaPoints.left)},
                {side: 'right', point: point.clone().add(deltaPoints.right)},
                {side: 'bottom', point: point.clone().add(deltaPoints.bottom)}
            ],
            len = points.length;
        for(i = 0; i < len;  i += 1) {
            value = checkPoint(points[i].point, points[i].side, point);
            if (value === -1) {
                return value;
            }
            if (value) {
                value = next(points[i].point);
                if (value === -1) {
                    return value;
                }
            }
        }
    }

    function isContained(x, y, logValue) {
        total = 0;
        checked = build(rows, cols);
        var point = new Point(x, y),
            value;
        if (available(point.x, point.y)) {
            setChecked(point.x, point.y);
            value = next(point);
            if (value === -1) {
                return -1;
            }
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

    function addUsed(points) {
        var i, len = points.length;
        for(i = 0; i < len; i += 1) {
            used[points[i].y][points[i].x] = 1;
        }
    }

    // find the shortest path between the 2 points.
    function findPath(startPoint, endPoint, board, validValues) {
        var i, len = validValues.length, validCache = {};
        for(i = 0; i < len; i += 1) {
            validCache[validValues[i]] = true;
        }
        startPoint = new Point(startPoint.x, startPoint.y);
        endPoint = new Point(endPoint.x, endPoint.y);
        return _findPath(startPoint, endPoint, board, validCache, {}, []);
    }

    function _findPath(startPoint, endPoint, board, validCache, checked, points) {
        var i, len = deltaPoints.length, point, value, key, result;
        for(i = 0; i < len; i += 1) {
            point = startPoint.clone().add(deltaPoints[i]);
            value = board[point.y] && board[point.y][point.x];
            if (value !== undefined && validCache[value] && !checked[(key = point.x + ':' + point.y)]) {
                checked[key] = true;
                if (point.x == endPoint.x && point.y === endPoint.y) {
                    points.push(point);
                    logPath(board, points);
                    return points;
                } else if ((result = _findPath(point, endPoint, board, validCache, checked, points.concat([point])))) {
                    return result;
                }
            }
        }
    }

    function cloneBoard(board) {
        var ary = [], y, x, ylen = board.length, xlen;
        for(y = 0; y < ylen; y += 1) {
            xlen = board[y].length;
            ary.push([]);
            for(x = 0; x < xlen; x += 1) {
                ary[y][x] = board[y][x];
            }
        }
        return board;
    }

    function logPath(board, path) {
        var b = cloneBoard(board), i, len = path.length, point;
        for(i = 0; i < len; i += 1) {
            point = path[i];
            b[point.y][point.x] = 'X';
        }
        log(b);
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
    this.addUsed = addUsed;
    this.findPath = findPath;
}
/**
 * 愛心樹 (Love Tree) Canvas 動畫引擎
 * 封裝樹幹生長、心形種子、愛心花朵綻放、平移與落葉跳動效果
 */
(function (window) {
    "use strict";

    /* ==========================================================================
       數學與幾何工具函式 (Math & Geometry Utilities)
       ========================================================================== */

    /**
     * 產生介於 min 與 max 之間的隨機整數
     * @param {number} min 最小值
     * @param {number} max 最大值
     * @returns {number}
     */
    function random(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    /**
     * 二次貝茲曲線插值計算 (Quadratic Bézier Curve)
     * @param {Point[]} cp 三個控制點 [起點, 控制點, 終點]
     * @param {number} t 插值參數 (0 ~ 1)
     * @returns {Point}
     */
    function bezier(cp, t) {
        var p1 = cp[0].mul((1 - t) * (1 - t));
        var p2 = cp[1].mul(2 * t * (1 - t));
        var p3 = cp[2].mul(t * t);
        return p1.add(p2).add(p3);
    }

    /**
     * 判斷座標 (x, y) 是否落在心形區域內
     * 隱函數方程式: (x^2 + y^2 - 1)^3 - x^2 * y^3 <= 0
     * @param {number} x
     * @param {number} y
     * @param {number} r 縮放半徑
     * @returns {boolean}
     */
    function inheart(x, y, r) {
        var nx = x / r;
        var ny = y / r;
        var nx2 = nx * nx;
        var ny2 = ny * ny;
        var formula = (nx2 + ny2 - 1);
        var z = formula * formula * formula - nx2 * ny2 * ny;
        return z < 0;
    }

    /* ==========================================================================
       二維向量 / 座標點類別 (Point Class)
       ========================================================================== */

    /**
     * 二維座標點
     * @param {number} [x=0]
     * @param {number} [y=0]
     */
    function Point(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    Point.prototype = {
        clone: function () {
            return new Point(this.x, this.y);
        },
        add: function (other) {
            var p = this.clone();
            p.x += other.x;
            p.y += other.y;
            return p;
        },
        sub: function (other) {
            var p = this.clone();
            p.x -= other.x;
            p.y -= other.y;
            return p;
        },
        div: function (n) {
            var p = this.clone();
            p.x /= n;
            p.y /= n;
            return p;
        },
        mul: function (n) {
            var p = this.clone();
            p.x *= n;
            p.y *= n;
            return p;
        }
    };

    /* ==========================================================================
       愛心外型座標點集合 (Heart Shape Generator)
       ========================================================================== */

    /**
     * 心形曲線參數點集合
     * 參數式:
     * x = 16 * sin^3(t)
     * y = 13 * cos(t) - 5 * cos(2t) - 2 * cos(3t) - cos(4t)
     */
    function Heart() {
        var points = [];
        var x, y, t;
        for (var i = 10; i < 30; i += 0.2) {
            t = i / Math.PI;
            x = 16 * Math.pow(Math.sin(t), 3);
            y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            points.push(new Point(x, y));
        }
        this.points = points;
        this.length = points.length;
    }

    Heart.prototype = {
        get: function (i, scale) {
            return this.points[i].mul(scale || 1);
        }
    };

    /* ==========================================================================
       種子元件 (Seed Component)
       ========================================================================== */

    /**
     * 愛心種子類別
     * @param {Tree} tree 所屬樹實例
     * @param {Point} point 初始位置
     * @param {number} [scale=1] 縮放比例
     * @param {string} [color='#FF0000'] 顏色
     */
    function Seed(tree, point, scale, color) {
        this.tree = tree;

        var actualScale = scale || 1;
        var actualColor = color || '#FF0000';

        this.heart = {
            point: point,
            scale: actualScale,
            color: actualColor,
            figure: new Heart()
        };

        this.cirle = {
            point: point,
            scale: actualScale,
            color: actualColor,
            figure: new Heart()
        };
    }

    Seed.prototype = {
        draw: function () {
            this.drawHeart();
            this.drawText();
        },
        addPosition: function (x, y) {
            this.cirle.point = this.cirle.point.add(new Point(x, y));
        },
        canMove: function () {
            return this.cirle.point.y < (this.tree.height + 20);
        },
        move: function (x, y) {
            this.clear();
            this.drawCirle();
            this.addPosition(x, y);
        },
        canScale: function () {
            return this.heart.scale > 0.2;
        },
        setHeartScale: function (scale) {
            this.heart.scale *= scale;
        },
        scale: function (scale) {
            this.clear();
            this.drawCirle();
            this.drawHeart();
            this.setHeartScale(scale);
        },
        drawHeart: function () {
            var ctx = this.tree.ctx;
            var heart = this.heart;
            var point = heart.point;
            var color = heart.color;
            var scale = heart.scale;

            ctx.save();
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (var i = 0; i < heart.figure.length; i++) {
                var p = heart.figure.get(i, scale);
                ctx.lineTo(p.x, -p.y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        drawCirle: function () {
            var ctx = this.tree.ctx;
            var cirle = this.cirle;
            var point = cirle.point;
            var color = cirle.color;
            var scale = cirle.scale;

            ctx.save();
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (var i = 0; i < cirle.figure.length; i++) {
                var p = cirle.figure.get(i, scale);
                ctx.lineTo(p.x, -p.y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        drawText: function () {
            var ctx = this.tree.ctx;
            var heart = this.heart;
            var point = heart.point;
            var color = heart.color;
            var scale = heart.scale;

            ctx.save();
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.scale(scale, scale);
            ctx.moveTo(0, 0);
            ctx.lineTo(15, 15);
            ctx.lineTo(75, 15);
            ctx.stroke();

            ctx.moveTo(0, 0);
            ctx.scale(0.75, 0.75);
            ctx.font = "10px 'Microsoft Yahei'";
            ctx.fillText("觸碰存摺子的💗", 23, 10, 75);
            ctx.restore();
        },
        clear: function () {
            var ctx = this.tree.ctx;
            var cirle = this.cirle;
            var point = cirle.point;
            var scale = cirle.scale;
            var radius = 26;
            var size = radius * scale;
            ctx.clearRect(point.x - size, point.y - size, 4 * size, 4 * size);
        },
        hover: function (x, y) {
            var ctx = this.tree.ctx;
            var pixel = ctx.getImageData(x, y, 1, 1);
            return pixel.data[3] === 255;
        }
    };

    /* ==========================================================================
       底部地平線元件 (Footer Ground Line Component)
       ========================================================================== */

    /**
     * 底部地面線條
     * @param {Tree} tree
     * @param {number} width
     * @param {number} height
     * @param {number} [speed=2]
     */
    function Footer(tree, width, height, speed) {
        this.tree = tree;
        this.point = new Point(tree.seed.heart.point.x, tree.height - height / 2);
        this.width = width;
        this.height = height;
        this.speed = speed || 2;
        this.length = 0;
    }

    Footer.prototype = {
        draw: function () {
            var ctx = this.tree.ctx;
            var point = this.point;
            var len = this.length / 2;

            ctx.save();
            ctx.strokeStyle = 'rgb(35, 31, 32)';
            ctx.lineWidth = this.height;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.translate(point.x, point.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(len, 0);
            ctx.lineTo(-len, 0);
            ctx.stroke();
            ctx.restore();

            if (this.length < this.width) {
                this.length += this.speed;
            }
        }
    };

    /* ==========================================================================
       樹幹枝椏元件 (Branch Component)
       ========================================================================== */

    /**
     * 樹幹枝節
     * @param {Tree} tree 所屬樹實例
     * @param {Point} point1 起點
     * @param {Point} point2 控制點
     * @param {Point} point3 終點
     * @param {number} radius 樹枝半徑
     * @param {number} [length=100] 生長步數
     * @param {Array} [branchs=[]] 次級樹枝定義
     */
    function Branch(tree, point1, point2, point3, radius, length, branchs) {
        this.tree = tree;
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
        this.radius = radius;
        this.length = length || 100;
        this.len = 0;
        this.t = 1 / (this.length - 1);
        this.branchs = branchs || [];
    }

    Branch.prototype = {
        grow: function () {
            var s = this;
            if (s.len <= s.length) {
                var p = bezier([s.point1, s.point2, s.point3], s.len * s.t);
                s.draw(p);
                s.len += 1;
                s.radius *= 0.97;
            } else {
                s.tree.removeBranch(s);
                s.tree.addBranchs(s.branchs);
            }
        },
        draw: function (p) {
            var ctx = this.tree.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = 'rgb(35, 31, 32)';
            ctx.shadowColor = 'rgb(35, 31, 32)';
            ctx.shadowBlur = 2;
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    };

    /* ==========================================================================
       愛心花朵 / 樹葉元件 (Bloom Leaf Component)
       ========================================================================== */

    /**
     * 愛心樹葉花朵
     * @param {Tree} tree 所屬樹實例
     * @param {Point} point 位置
     * @param {Heart} figure 心形模型
     * @param {string} [color] 顏色
     * @param {number} [alpha] 透明度
     * @param {number} [angle] 旋轉角度
     * @param {number} [scale=0.1] 初始大小
     * @param {Point} [place] 目標降落位置
     * @param {number} [speed] 移動速度
     */
    function Bloom(tree, point, figure, color, alpha, angle, scale, place, speed) {
        this.tree = tree;
        this.point = point;
        this.color = color || ('rgb(255,' + random(0, 150) + ',' + random(0, 150) + ')');
        this.alpha = alpha || random(0.3, 1);
        this.angle = angle || random(0, 360);
        this.scale = scale || 0.1;
        this.place = place;
        this.speed = speed;
        this.figure = figure;
    }

    Bloom.prototype = {
        setFigure: function (figure) {
            this.figure = figure;
        },
        flower: function () {
            this.draw();
            this.scale += 0.1;
            if (this.scale > 1) {
                this.tree.removeBloom(this);
            }
        },
        draw: function () {
            var ctx = this.tree.ctx;
            var figure = this.figure;

            ctx.save();
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.translate(this.point.x, this.point.y);
            ctx.scale(this.scale, this.scale);
            ctx.rotate(this.angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (var i = 0; i < figure.length; i++) {
                var p = figure.get(i);
                ctx.lineTo(p.x, -p.y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        jump: function () {
            var height = this.tree.height;
            if (this.point.x < -20 || this.point.y > height + 20) {
                this.tree.removeBloom(this);
            } else {
                this.draw();
                this.point = this.place.sub(this.point).div(this.speed).add(this.point);
                this.angle += 0.05;
                this.speed -= 1;
            }
        }
    };

    /* ==========================================================================
       愛心樹主體類別 (Tree Main Class)
       ========================================================================== */

    /**
     * 愛心樹動畫核心實例
     * @param {HTMLCanvasElement} canvas
     * @param {number} width
     * @param {number} height
     * @param {Object} [opt]
     */
    function Tree(canvas, width, height, opt) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.opt = opt || {};
        this.record = {};

        this.initSeed();
        this.initFooter();
        this.initBranch();
        this.initBloom();
    }

    Tree.prototype = {
        initSeed: function () {
            var seed = this.opt.seed || {};
            var x = seed.x || this.width / 2;
            var y = seed.y || this.height / 2;
            var point = new Point(x, y);
            var color = seed.color || '#FF0000';
            var scale = seed.scale || 1;

            this.seed = new Seed(this, point, scale, color);
        },

        initFooter: function () {
            var footer = this.opt.footer || {};
            var width = footer.width || this.width;
            var height = footer.height || 5;
            var speed = footer.speed || 2;
            this.footer = new Footer(this, width, height, speed);
        },

        initBranch: function () {
            var branchs = this.opt.branch || [];
            this.branchs = [];
            this.addBranchs(branchs);
        },

        initBloom: function () {
            var bloom = this.opt.bloom || {};
            var cache = [];
            var num = bloom.num || 500;
            var width = bloom.width || this.width;
            var height = bloom.height || this.height;
            var figure = this.seed.heart.figure;
            var r = 240;

            for (var i = 0; i < num; i++) {
                cache.push(this.createBloom(width, height, r, figure));
            }
            this.blooms = [];
            this.bloomsCache = cache;
        },

        toDataURL: function (type) {
            return this.canvas.toDataURL(type);
        },

        draw: function (k) {
            var rec = this.record[k];
            if (!rec) {
                return;
            }
            var ctx = this.ctx;
            ctx.save();
            ctx.putImageData(rec.image, rec.point.x, rec.point.y);
            ctx.restore();
        },

        addBranch: function (branch) {
            this.branchs.push(branch);
        },

        addBranchs: function (branchs) {
            for (var i = 0; i < branchs.length; i++) {
                var b = branchs[i];
                var p1 = new Point(b[0], b[1]);
                var p2 = new Point(b[2], b[3]);
                var p3 = new Point(b[4], b[5]);
                var r = b[6];
                var l = b[7];
                var c = b[8];
                this.addBranch(new Branch(this, p1, p2, p3, r, l, c));
            }
        },

        removeBranch: function (branch) {
            var branchs = this.branchs;
            for (var i = 0; i < branchs.length; i++) {
                if (branchs[i] === branch) {
                    branchs.splice(i, 1);
                    break;
                }
            }
        },

        canGrow: function () {
            return !!this.branchs.length;
        },

        grow: function () {
            var branchs = this.branchs;
            for (var i = 0; i < branchs.length; i++) {
                var branch = branchs[i];
                if (branch) {
                    branch.grow();
                }
            }
        },

        addBloom: function (bloom) {
            this.blooms.push(bloom);
        },

        removeBloom: function (bloom) {
            var blooms = this.blooms;
            for (var i = 0; i < blooms.length; i++) {
                if (blooms[i] === bloom) {
                    blooms.splice(i, 1);
                    break;
                }
            }
        },

        createBloom: function (width, height, radius, figure, color, alpha, angle, scale, place, speed) {
            var x, y;
            while (true) {
                x = random(20, width - 20);
                y = random(20, height - 20);
                if (inheart(x - width / 2, height - (height - 40) / 2 - y, radius)) {
                    return new Bloom(this, new Point(x, y), figure, color, alpha, angle, scale, place, speed);
                }
            }
        },

        canFlower: function () {
            return !!this.blooms.length;
        },

        flower: function (num) {
            var blooms = this.bloomsCache.splice(0, num);
            var i;
            for (i = 0; i < blooms.length; i++) {
                this.addBloom(blooms[i]);
            }
            blooms = this.blooms;
            for (i = 0; i < blooms.length; i++) {
                blooms[i].flower();
            }
        },

        snapshot: function (k, x, y, width, height) {
            var ctx = this.ctx;
            var image = ctx.getImageData(x, y, width, height);
            this.record[k] = {
                image: image,
                point: new Point(x, y),
                width: width,
                height: height
            };
        },

        setSpeed: function (k, speed) {
            this.record[k || "move"].speed = speed;
        },

        move: function (k, targetX, targetY) {
            var ctx = this.ctx;
            var rec = this.record[k || "move"];
            var point = rec.point;
            var image = rec.image;
            var speed = rec.speed || 10;
            var width = rec.width;
            var height = rec.height;

            var newX = (point.x + speed < targetX) ? (point.x + speed) : targetX;
            var newY = (point.y + speed < targetY) ? (point.y + speed) : targetY;

            ctx.save();
            ctx.clearRect(point.x, point.y, width, height);
            ctx.putImageData(image, newX, newY);
            ctx.restore();

            rec.point = new Point(newX, newY);
            rec.speed = speed * 0.95;

            if (rec.speed < 2) {
                rec.speed = 2;
            }
            return newX < targetX || newY < targetY;
        },

        jump: function () {
            var blooms = this.blooms;
            var i;
            if (blooms.length) {
                for (i = 0; i < blooms.length; i++) {
                    blooms[i].jump();
                }
            }
            if (!blooms.length || blooms.length < 3) {
                var bloom = this.opt.bloom || {};
                var width = bloom.width || this.width;
                var height = bloom.height || this.height;
                var figure = this.seed.heart.figure;
                var r = 240;
                var count = random(1, 2);
                for (i = 0; i < count; i++) {
                    blooms.push(this.createBloom(
                        width / 2 + width,
                        height,
                        r,
                        figure,
                        null,
                        1,
                        null,
                        1,
                        new Point(random(-100, 600), 720),
                        random(200, 300)
                    ));
                }
            }
        }
    };

    /* ==========================================================================
       導出至全域命名空間 (Exports)
       ========================================================================== */

    window.random = random;
    window.bezier = bezier;
    window.Point = Point;
    window.Tree = Tree;

})(window);

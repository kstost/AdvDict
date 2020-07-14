// okk
(function () {
    var root = this;
    var AdvDict = function () {
        var pointer = this;
        pointer.dict = {};
        pointer.length = 0;
        pointer.ucnt = 0;
        pointer.update = false;
        pointer.list = [];
        pointer.keys = [];
    };
    AdvDict.prototype = {
        set: function (key, val) {
            var pointer = this;
            if (pointer.dict[key] === undefined) {
                if (val !== undefined) {
                    pointer.dict[key] = {
                        body: val,
                        idx: pointer.ucnt
                    };
                    pointer.length++;
                    pointer.ucnt++;
                    pointer.update = true;
                    pointer.keys = Object.keys(pointer.dict);
                }
            }
        },
        del: function (key) {
            var pointer = this;
            if (pointer.dict[key] !== undefined) {
                delete pointer.dict[key];
                pointer.length--;
                pointer.update = true;
                pointer.keys = Object.keys(pointer.dict);
            }
        },
        get: function (key) {
            var pointer = this;
            if (pointer.dict[key]) {
                return pointer.dict[key].body;
            }
        },
        get_sorted_list: function (idx) {
            var pointer = this;
            if (pointer.update) {
                var tmp_list = [];
                for (var key in pointer.dict) {
                    tmp_list.push([pointer.dict[key].body, pointer.dict[key].idx]);
                }
                tmp_list.sort(function (a, b) {
                    return a[1] - b[1];
                });
                while (pointer.list.length > 0) {
                    pointer.list.splice(0, 1);
                }
                tmp_list.forEach(item => {
                    pointer.list.push(item[0]);
                });
            }
            pointer.update = false;
            if (idx !== undefined) {
                return pointer.list[idx];
            }
            return pointer.list;
        },
        loop: function (func) {
            var pointer = this;
            for (let i = 0; i < pointer.keys.length; i++) {
                let key = pointer.keys[i];
                func(pointer.dict[key].body, key, pointer);
            }
        }
    };
    root.AdvDict = AdvDict;
}).call(this);

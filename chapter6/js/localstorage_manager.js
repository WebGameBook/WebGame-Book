var LocalStorageManager = function () {};

LocalStorageManager.prototype.save = function (key,data) {
    window.localStorage.setItem(key,JSON.stringify(data));
};

LocalStorageManager.prototype.load = function (key) {
    // console.log(window.localStorage.getItem(key));
    return JSON.parse(window.localStorage.getItem(key));
};

LocalStorageManager.prototype.delete = function (key) {
    window.localStorage.removeItem(key);
};

LocalStorageManager.prototype.clear = function () {
    window.localStorage.clear();
};


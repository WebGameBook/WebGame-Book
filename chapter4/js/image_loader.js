export default class ImageLoader {
    constructor(imageUrl) {
        this.imageUrls = [];
        this.assets = [];
        this.loading = false;
        this.callback = function () {};
        this.addImage(imageUrl);
    }

    addImage(imageUrl) {
        if (this.loading) {
            console.log("loader cannot add more images while it's loading");
            return;
        }

        if (Array.isArray(imageUrl)) {
            this.imageUrls = this.imageUrls.concat(imageUrl);
        } else {
            this.imageUrls.push(imageUrl);
        }
    }

    load() {
        this.assets = this.imageUrls.map((url) => {
            let image = new Image();
            image.onload = () => this.onload(image);
            image.src = url;

            return image;
        });
    }

    done(callback) {
        if (typeof callback === "function") {
            this.callback = callback;
        }
    }

    onload(image) {
        image.loaded = true;

        if (this.assets.every((image) => image.loaded)) {
            this.callback();
            this.loading = false;
        }
    }
}

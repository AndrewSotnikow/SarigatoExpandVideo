/**
 * @file Stores functions invoked when expand ready
 * @name expand.js
 * @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
 * @version 2.0.0
 */

/** Function invoked when expand configuration is ready
 * @function Sataku.expand
 * @param {object} that {@link Sataku} object
 * @param {object} _that {@link Sataku~_that} object
 * @returns {undefined}
 */
Sataku.expand = (function () {
    return function (that, _that) {
        if ([CREATION_TYPE_RICH_EXPAND, CREATION_TYPE_MOBILE_EXPAND_RICH].indexOf(that.config.creationType) === -1) {
            _that.players.forEach(player => {
                player.setVideo();
            });
            // _that.player.start();
        }

        if (that.config.deviceType === DEVICE_TYPE_DESKTOP) {
            var resizeHandler = function () {
                var overflowVal = _that.doc.expandWorkspace.clientHeight - window.innerHeight;
                _that.doc.expandWorkspace[overflowVal > 0 ? 'stkAddClass' : 'stkRemoveClass']('fixed');

                // uncomment if players` controls are overflowing outside of #expand-workspace
                // if (overflowVal > 0) {
                //     _that.players.forEach(player => {
                //         player.reactToVerticalOverflow(_that.doc.expandWorkspace, overflowVal);
                //     });
                // }
            };
            window.stkListen('resize', resizeHandler, false);
            resizeHandler();
        }

        _that.doc.expand.stkStyleElement({
            visibility: 'visible',
            backgroundColor: '#000'
        });
        stkLazyLoad('[data-src]', function () {
            // console.log('Images loaded.');
        });
        main(that, _that);
        Window.APP.intro();
    };
})();

/** Function invoked when closing expand
 * @function Sataku.expandOutro
 * @param {function} callback Callback to invoke on complete of outro
 */
Sataku.expandOutro = function (callback) {
    // Here we animate outro tweens.
    Window.APP.outro(callback);
    // callback();
};


function main(that, _that) {
    let e = {
        bg: document.querySelector(".bg"),
        introArrow: document.querySelector(".introArrow"),
        introClaimBottom: document.querySelector(".introClaimBottom"),
        introClaimTop: document.querySelector(".introClaimTop"),
        introLeaf: document.querySelector(".introLeaf"),
        introText: document.querySelector(".introText"),
        intro: document.querySelector(".intro"),
        container: document.querySelector(".container"),
        close: document.getElementById("close-expand"),
        static: document.querySelector(".static"),
        cta: document.querySelector(".cta"),
        arrow: document.querySelector(".arrow"),
        scene: [...document.querySelectorAll(".scene")],
        bigElement: [...document.querySelectorAll(".bigElement")],
        counter: 0,
        productRotation: function () {
            setInterval(() => {
                e.scene.forEach((el, i) => {
                    if (i === e.counter) {
                        el.classList.add("active");
                    } else {
                        el.classList.remove("active");
                    }
                    if (e.counter === 5) {
                        e.counter = 0;
                        e.scene[0].classList.add("active");
                    }
                });
                e.bigElement.forEach((el, i) => {
                    if (i === e.counter) {
                        el.classList.remove("hide");
                    } else {
                        el.classList.add("hide");
                    }
                });
                e.counter++;
            }, 4500);
            return;
        },
        init: function () {
            e.container.classList.remove("hide");
            e.static.classList.remove("hide");
            e.cta.classList.toggle("hide");
            e.arrow.classList.toggle("hide");
            e.productRotation();
            _that.player.start();
            return;
        },
    }
    Window.APP = {};

    Window.APP.intro = intro;
    Window.APP.outro = outro;

    function intro() {
        e.bg.classList.toggle("hide");
        e.intro.classList.toggle("hide");
        e.close.classList.toggle("hide");
        setTimeout(() => {
            e.introLeaf.classList.toggle("hide");
            setTimeout(() => {
                e.introArrow.classList.toggle("hide");
                setTimeout(() => {
                    e.introClaimTop.classList.toggle("hide");
                    e.introClaimBottom.classList.toggle("hide");
                    setTimeout(() => {
                        e.introClaimTop.classList.toggle("deActive");
                        e.introClaimBottom.classList.toggle("deActive");
                        setTimeout(() => {
                            e.introArrow.classList.toggle("move");
                            e.introLeaf.classList.toggle("move");
                            setTimeout(() => {
                                e.introText.classList.toggle("hide");
                                setTimeout(() => {
                                    e.introClaimTop.classList.toggle("hide");
                                    e.introClaimBottom.classList.toggle("hide");
                                    // e.introArrow.classList.toggle("deActive");
                                    e.introArrow.classList.toggle("hide");
                                    e.introClaimTop.classList.toggle("deActive");
                                    e.introClaimBottom.classList.toggle("deActive");
                                    e.intro.classList.toggle("hide");
                                    e.introText.classList.toggle("hide");
                                    e.introLeaf.classList.toggle("hide");
                                    e.introLeaf.classList.toggle("move");
                                    e.introArrow.classList.toggle("move");
                                    e.init();
                                }, 700);
                            }, 500);
                        }, 500);
                    }, 700);
                }, 500);
            }, 500);
        }, 500);
        return;
    }

    function outro(callback) {
        e.container.classList.add("hide");
        e.static.classList.add("hide");
        e.intro.classList.remove("hide");
        e.cta.classList.toggle("hide");
        e.close.classList.toggle("hide");
        setTimeout(() => {
            e.introLeaf.classList.toggle("hide");
            setTimeout(() => {
                e.introArrow.classList.toggle("hide");
                setTimeout(() => {
                    e.introClaimTop.classList.toggle("hide");
                    e.introClaimBottom.classList.toggle("hide");
                    setTimeout(() => {
                        e.introClaimTop.classList.toggle("deActive");
                        e.introClaimBottom.classList.toggle("deActive");
                        setTimeout(() => {
                            e.introArrow.classList.toggle("move");
                            e.introLeaf.classList.toggle("move");
                            setTimeout(() => {
                                e.introText.classList.toggle("hide");
                                setTimeout(() => {
                                    e.introClaimTop.classList.toggle("hide");
                                    e.introClaimBottom.classList.toggle("hide");
                                    e.introArrow.classList.toggle("deActive");
                                    e.introArrow.classList.toggle("hide");
                                    e.introClaimTop.classList.toggle("deActive");
                                    e.introClaimBottom.classList.toggle("deActive");
                                    e.intro.classList.toggle("hide");
                                    e.introText.classList.toggle("hide");
                                    setTimeout(()=>{
                                        callback();
                                    },500)
                                }, 700);
                            }, 500);
                        }, 500);
                    }, 700);
                }, 500);
            }, 500);
        }, 500);
        return;
    }

    return;
}

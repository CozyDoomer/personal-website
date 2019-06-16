$(document).ready(function() {

    // MODAL
    var modalText = {
        gem7: {
            title: 'Recycling Center Software',
            tag: 'COMMUNITY ANALYTICS.',
            detail: 'Contributed to Atimis GEM7 which provides an easy to use web application for communities to capture the usage of their local recycling center for citizen and companies, including limits, warrants, statistics and reports.'
        },
        hpa: {
            title: 'Human Protein Atlas Image Classification',
            tag: 'IMAGE CLASSIFICATION.',
            detail: 'Developed models capable of classifying mixed patterns of proteins in microscope images. Placed in the top 5% of competitors with usage of the fast.ai library built on PyTorch, extensive testing of neural network structures and image processing.',
            link: 'https://www.kaggle.com/c/human-protein-atlas-image-classification/overview'
        },
        styletrans: {
            title: 'Style Transfer between Images',
            tag: 'EXPERIMENTING WITH DEEP LEARNING.',
            detail: 'From the 2nd fast.ai course (2018) I got the Idea to try different networks for transfering art styles. Turns out the VGG convolutional neural network works great for this but I never continued the experiments outside these few examples.',
            link: 'https://github.com/DollofCuty/Deep-Learning/blob/master/unstructured-data/image/style-transfer/style_transfer_fastai.ipynb'
        },
        houseprices: {
            title: 'House Prices: Advanced Regression',
            tag: 'STRUCTURED DATA REGRESSION.',
            detail: 'Playground Competition (no price pool) where I trained multiple models: Lasso regression model, XGBoost model, LGBM model with heavy feature engineering, and blending to reach the top 1% of 4700 other Data Scientists (rank 30).',
            link: 'https://github.com/DollofCuty/Deep-Learning/blob/master/structured-data/house-prices/house_prices_fe.ipynb'
        },
        thissite: {
            title: 'christianunterrainer.com',
            tag: 'REFRESHING MY WEBDEV SKILLS.',
            detail: 'I started working on a personal website for multiple reasons but the one that stood out is to try out the inference of machine learning models in production. The backend written in flask made it really easy to implement this and I started focusing more on the frontend.',
            link: 'https://github.com/DollofCuty/personal-website/tree/master'
        },
        predictsales: {
            title: 'Predict Future Sales',
            tag: 'STRUCTURED TIME SERIES DATA.',
            detail: 'The Mall is a place to follow the latest fashion purchases of your friends and favorite celebrities. Built with Node.js and Handlebars. Features the ability to import thousands of top brands products into one shopping site.',
            link: 'https://github.com/DollofCuty/Deep-Learning/blob/master/structured-data/predict-future-sales/predict_sales-xgboost.ipynb'
        }
    };

    $('#gallery .button').on('click', function() {
        fillModal(this.id);
        $('.modal-wrap').addClass('visible');
    });

    $('.close').on('click', function() {
        $('.modal-wrap, #modal .button').removeClass('visible');
    });

    $('.mask').on('click', function() {
        $('.modal-wrap, #modal .button').removeClass('visible');
    });

    var carousel = $('#carousel'),
        slideWidth = 700,
        threshold = slideWidth / 3,
        dragStart,
        dragEnd;

    setDimensions();

    $('#next').click(function() { shiftSlide(-1) })
    $('#prev').click(function() { shiftSlide(1) })

    carousel.on('mousedown', function() {
        if (carousel.hasClass('transition')) return;
        dragStart = event.pageX;
        $(this).on('mousemove', function() {
            dragEnd = event.pageX;
            $(this).css('transform', 'translateX(' + dragPos() + 'px)');
        });
        $(document).on('mouseup', function() {
            if (dragPos() > threshold) { return shiftSlide(1) }
            if (dragPos() < -threshold) { return shiftSlide(-1) }
            shiftSlide(0);
        });
    });

    function setDimensions() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            slideWidth = $(window).innerWidth();
        }
        $('.carousel-wrap, .slide').css('width', slideWidth);
        $('.modal').css('max-width', slideWidth);
        $('#carousel').css('left', slideWidth * -1)
    }

    function dragPos() {
        return dragEnd - dragStart;
    }

    function shiftSlide(direction) {
        if (carousel.hasClass('transition')) return;
        dragEnd = dragStart;
        $(document).off('mouseup')
        carousel.off('mousemove')
            .addClass('transition')
            .css('transform', 'translateX(' + (direction * slideWidth) + 'px)');
        setTimeout(function() {
            if (direction === 1) {
                $('.slide:first').before($('.slide:last'));
            } else if (direction === -1) {
                $('.slide:last').after($('.slide:first'));
            }
            carousel.removeClass('transition')
            carousel.css('transform', 'translateX(0px)');
        }, 700)
    }

    function fillModal(id) {
        $('#modal .title').text(modalText[id].title);
        $('#modal .detail').text(modalText[id].detail);
        $('#modal .tag').text(modalText[id].tag);
        if (modalText[id].link) $('#modal .button').addClass('visible')
            .parent()
            .attr('href', modalText[id].link)

        $.each($('#modal li'), function(index, value) {
            $(this).text(modalText[id].bullets[index]);
        });
        $.each($('#modal .slide'), function(index, value) {
            $(this).css({
                background: "url('/static/img/slides/" + id + '-' + index + ".jpg') center center/cover",
                backgroundSize: 'cover'
            });

        });
    }
})
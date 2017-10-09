
window.onload = function(){


    // PRELOADER #2
    var images = document.images,
        images_total_count = images.length, // all images
        images_loaded_count = 0, // loaded images
        preloader = document.getElementById('page-preloader'),
        perc_display = document.getElementById('load_perc'); // display percent

    for (var i=0; i<images_total_count; i++) {
        image_clone = new Image();
        image_clone.onload = image_loaded;
        image_clone.onerror = image_loaded;
        image_clone.src = images[i].src;
    }

    function image_loaded() {
        images_loaded_count++;
        perc_display.innerHTML = (((100 / images_total_count) * images_loaded_count) << 0) + '%';

        if (images_loaded_count >= images_total_count) {
            setTimeout(function () {
                if (!preloader.classList.contains('done')) {
                    preloader.classList.add('done');
                }
            }, 1000);
        }
    }


    var img = document.querySelector('.nav__img'), // menu icon
        list = document.querySelector('.list__nav'), // menu nav
        close = document.querySelector('.container__button-close'), // for close menu on key 'X' on mobile version
        list2 = document.querySelector('#list'), // id of header list
        span = document.createElement('span'), // new elem for replace menu img onclick and back when close
        login = document.querySelector('.list__item--last'), // login item
        authForm = document.querySelector('.auth-form'), // popup auth form
        //var closePopup = document.querySelector('.btn-close'); // button of popup
        formLogin = document.querySelector('.form__login'), // login field of popup form
        formPassword  = document.querySelector('.form__password'), // password field of popup form
        tooltip = document.querySelector('.form__tooltip'), // tooltip of popup form
        popupForm = document.getElementById('popupForm'), // form of popup
        popupBtn = document.getElementById('popupBtn'),
        flexCont = document.querySelector('.flex-container'), // flex container which contains: header content footer
        cont = document.querySelector('.popup__container'); // popup container (auth-form)


    // getting current location for redirect form from /user/login/ when closed
    var location = window.location,
        newLocation = String(location),
        subLocation = '/user/login/';


    // open menu onClick
    img.addEventListener('click', function () {

        list.classList.add('container__list--show');
        flexCont.style.opacity = .5;

        span.className = 'nav__img';
        span.innerHTML = '<img class=\"img--active\" src=\"\/static/img/menu-icon-active.png\">';
        list2.replaceChild(span, img);
    });


    // close menu onClick to 'X"
    close.addEventListener('click', function () {
        list.classList.add('container__list--none'); // animation of closing menu


        function closeMenu() {
            list.classList.remove('container__list--show');
            img.classList.add('nav__img');
            list2.replaceChild(img, list2.children[1]);
            list.classList.remove('container__list--none');
            flexCont.style.opacity = 1;
        }

        setTimeout(closeMenu, 1000);
    });


    //close menu by pressing out of form
    var itemLink = document.getElementById('item__link');
    var imgBurger = document.getElementById('imgBurger');

    function closeMenu(event) {
        var target = event.target;

        if (target.id !== itemLink.id && target.id !== imgBurger.id) {
            list.classList.add('container__list--none'); // animation of closing menu

            function closeMenu() {
                list.classList.remove('container__list--show');
                list2.replaceChild(img, list2.children[1]);
                list.classList.remove('container__list--none');
            }

            setTimeout(closeMenu, 400);
            flexCont.style.opacity = 1;
        }
    }

    document.body.addEventListener('click', closeMenu, true);


    /// POPUP

    // open popup
    if (cont) {
        login.addEventListener('click', function () {
            authForm.classList.add('login--active');
            list.classList.toggle('container__list--show', false);
            list2.replaceChild(img, list2.children[1]);
            // closePopup.classList.remove('btn-close');
            // closePopup.classList.add('btn--active');

            popupBtn.disabled = true;
            popupBtn.classList.add('form__submit--disabled');
            flexCont.style.opacity = .2;
        });


        // close popup  by pressing out of form
        var auth = document.getElementById('auth'), // authentication form
            flex = document.getElementById('flex'); // flex container which contains: header, content, footer

        function closeAuth(event) {
            var target = event.target;

            while (target.id !== flex.id) {
                if (target.children !== auth.children) {
                    authForm.classList.add('login--none'); // animation of closing popup

                    function closePopup() {
                        authForm.classList.remove('login--active');

                        // closePopup.classList.add('btn-close');
                        // closePopup.classList.remove('btn--active');

                        formLogin.classList.remove('form__login--red');
                        formLogin.classList.remove('form__login--green');
                        formLogin.classList.add('form__login');
                        tooltip.classList.remove('form__tooltip--active');
                        tooltip.classList.add('form__tooltip--none');
                        formPassword.classList.remove('form__password--red');
                        formPassword.classList.remove('form__password--green');
                        formPassword.classList.add('form__password');
                        authForm.classList.remove('login--none');
                    }

                    setTimeout(closePopup, 400);
                    flexCont.style.opacity = 1;

                    // for redirect from /user/login/ to / if form is closed
                    if (newLocation.includes(subLocation) === true) {
                        document.location.href = '/';
                    }

                    popupForm.reset();

                    for (var i = 0; i < formLogin.length; i++) formLogin[i].style.border = '1px solid black';
                    for (var g = 0; g < tooltip.length; g++) tooltip[g].style.display = 'none';

                    return;
                }
            }
        }

        flex.addEventListener('click', closeAuth, true);


        // // close popup on key 'X'
        // closePopup.addEventListener('click', function () {
        //     authForm.classList.remove('login--active');
        //     closePopup.classList.add('btn-close');
        //     closePopup.classList.remove('btn--active');
        //
        //     // for redirect from /user/login/ to / if form is closed
        //     if (newLocation.includes(subLocation) === true) {
        //         document.location.href= '/';
        //     }
        // });


        // if current URL includes /user/login/ popup active
        function activePopup() {
            if (newLocation.includes(subLocation) === true) {
                authForm.classList.add('login--active');
                //closePopup.classList.add('btn--active');

                popupBtn.disabled = true;
                popupBtn.classList.add('form__submit--disabled');
                popupBtn.classList.remove('form__submit');
                popupForm.reset();
                flexCont.style.opacity = .2;
                authForm.classList.add('error1');
            }
        }

        activePopup();


        // POPUP AUTH FORM VALIDATION
        var inputLogin = document.querySelector('#login'),
            inputPassword = document.getElementById('password'),
            form = document.querySelector('.form');

        if (cont) {
            // form validation field login
            inputLogin.addEventListener('input', function (event) {
                event.preventDefault();
                var email = inputLogin.value,
                    emailPattern = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                    testEmail = emailPattern.test(email),
                    username = inputLogin.value,
                    usernamePattern = /^[a-zA-Z][a-zA-Z0-9-_\.]{4,20}$/, // с огр-м 5-20, к-мы могут быть быквы и цифры, первый обязательно буква
                    testUsername = usernamePattern.test(username);


                if (testEmail || testUsername) {
                    formLogin.classList.remove('form__login');
                    formLogin.classList.remove('form__login--red');
                    formLogin.classList.add('form__login--green');

                    tooltip.classList.remove('form__tooltip--active');
                    tooltip.classList.add('form__tooltip--none');
                } else {
                    formLogin.classList.remove('form__login--green');
                    formLogin.classList.remove('form__login');
                    formLogin.classList.add('form__login--red');

                    tooltip.classList.remove('form__tooltip--none');
                    tooltip.classList.add('form__tooltip--active');
                }
            });

            //form validation field password
            inputPassword.addEventListener('input', function (event) {
                event.preventDefault();
                var passVal = inputPassword.value;

                if (passVal.length < 6) {
                    formPassword.classList.remove('form__password');
                    formPassword.classList.add('form__password--red');
                    formPassword.classList.remove('form__password--green');
                } else {
                    formPassword.classList.remove('form__password--red');
                    formPassword.classList.add('form__password--green');
                }

            });


            // validation input login and password to disabled or undisabled button
            form.addEventListener('input', function () {
                if (inputLogin.classList.contains('form__login--green') && inputPassword.classList.contains('form__password--green')) {
                    popupBtn.disabled = false;
                    popupBtn.classList.remove('form__submit--disabled');
                    popupBtn.classList.add('form__submit');
                } else if (inputLogin.classList.contains('form__login--red') || inputPassword.classList.contains('form__password--red')) {
                    popupBtn.disabled = true;
                    popupBtn.classList.add('form__submit--disabled');
                }
            });
        }



    }

    // REGISTRATION FORM
    var subLocation2 = '/user/registration/',
        usernameClass = document.querySelector('.tr__username'),
        emailClass = document.querySelector('.tr__email'),
        password1Class = document.querySelector('.tr__password1'),
        password2Class = document.querySelector('.tr__password2'),
        regBtn = document.getElementById('reg');


    if (newLocation.includes(subLocation2) === true) {

        // change style of disabled btn
        regBtn.classList.remove('.regForm__btn');
        regBtn.classList.add('regForm__btn--disabled');

        var inpUsername = document.getElementById('username'),
            inpEmail = document.getElementById('email'),
            inpPas1 = document.getElementById('password1'),
            inpPas2 = document.getElementById('password2');


        // username field validation
        inpUsername.addEventListener('input', function (event) {
            event.preventDefault();

            var usernameVal = inpUsername.value,
                usernamePattern = /^[a-zA-Z][a-zA-Z0-9-_\.]{4,20}$/, // с огр-м 5-20, к-мы могут быть быквы и цифры, первый обязательно буква
                testUsername = usernamePattern.test(usernameVal);

            if (testUsername) {
                usernameClass.classList.remove('tr__username');
                usernameClass.classList.remove('tr__username--red');
                usernameClass.classList.add('tr__username--green');
            } else {
                usernameClass.classList.remove('tr__username--green');
                usernameClass.classList.remove('tr__username');
                usernameClass.classList.add('tr__username--red');
            }
        });


        // email field validation
        inpEmail.addEventListener('input', function (event) {
           event.preventDefault();

           var emailVal = inpEmail.value,
               emailPattern = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
               testEmail = emailPattern.test(emailVal);

           if (testEmail) {
               emailClass.classList.remove('tr__email');
               emailClass.classList.remove('tr__email--red');
               emailClass.classList.add('tr__email--green');
           } else {
               emailClass.classList.remove('tr__email--green');
               emailClass.classList.remove('tr__email');
               emailClass.classList.add('tr__email--red');
           }
        });


        // password1 field validation
        inpPas1.addEventListener('input', function (event) {
            event.preventDefault();

            var pasVal = inpPas1.value,
                passwordPattern = /(?=.*[0-9])(?=.*[a-z]){6,}/, // строка содержит хотя бы одно число и одну букву, от 6 символов
                testPassword = passwordPattern.test(pasVal);

            if (pasVal.length > 5 && testPassword) {
                password1Class.classList.remove('tr__password1');
                password1Class.classList.remove('tr__password1--red');
                password1Class.classList.add('tr__password1--green');
            } else {
                password1Class.classList.remove('tr__password1--green');
                password1Class.classList.remove('tr__password1');
                password1Class.classList.add('tr__password1--red');
            }
        });


        // confirm password field validation
        inpPas2.addEventListener('input', function (event) {
            event.preventDefault();

            var pasVal = inpPas1.value,
                pasVal2 = inpPas2.value;

            if (pasVal2 === pasVal && pasVal2.length !== 0) {
                password2Class.classList.remove('tr__password2');
                password2Class.classList.remove('tr__password2--red');
                password2Class.classList.add('tr__password2--green');
            } else {
                password2Class.classList.remove('tr__password2--green');
                password2Class.classList.remove('tr__password2');
                password2Class.classList.add('tr__password2--red');
            }
        });


        var regForm = document.querySelector('.regForm');

        regForm.addEventListener('input', function (event) {
            event.preventDefault();

            // validation for undisable btn
            if (inpUsername.classList.contains('tr__username--green') && inpEmail.classList.contains('tr__email--green')
                && inpPas1.classList.contains('tr__password1--green') && inpPas2.classList.contains('tr__password2--green')) {

                regBtn.classList.remove('regForm__btn--disabled');
                regBtn.classList.add('.regForm__btn');
                regBtn.disabled = false;

            } else if (inpUsername.classList.contains('tr__username--red') || inpEmail.classList.contains('tr__email--red')
                || inpPas1.classList.contains('tr__password1--red') || inpPas2.classList.contains('tr__password2--red')) {

                regBtn.classList.remove('.regForm__btn');
                regBtn.classList.add('regForm__btn--disabled');
                regBtn.disabled = true;
            }

        });
    }

    // SLIDER
    var slider = document.querySelector('.content__slider');

    if (slider) {
        var controls = document.querySelectorAll('.controls');

        for (var z = 0; z < controls.length; z++) {
            controls[z].style.display = 'inline-block';
        }

        var slides = document.querySelectorAll('#slides .slide'),
            currentSlide = 0,
            squares = document.querySelectorAll('#squares .square'),
            currentSquare = 0,
            slideInterval = setInterval(nextSlide, 2000);

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function previousSlide() {
            goToSlide(currentSlide - 1);
        }

        function goToSlide(n) {
            slides[currentSlide].className = 'slide';
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].className = 'slide showing';

            squares[currentSquare].className = 'square';
            currentSquare = (n + squares.length) % squares.length;
            squares[currentSquare].className = 'square current';
        }


        var playing = true,
            pauseButton = document.getElementById('pause');

        function pauseSlideshow() {
            pauseButton.innerHTML = '&#9658;'; // play character
            playing = false;
            clearInterval(slideInterval);
        }

        function playSlideshow() {
            pauseButton.innerHTML = '&#10074;&#10074;'; // pause character
            playing = true;
            slideInterval = setInterval(nextSlide, 2000);
        }

        pauseButton.onclick = function () {
            if (playing) {
                pauseSlideshow();
            }
            else {
                playSlideshow();
            }
        };

        var next = document.getElementById('next'),
            previous = document.getElementById('previous');

        next.onclick = function () {
            pauseSlideshow();
            nextSlide();
        };
        previous.onclick = function () {
            pauseSlideshow();
            previousSlide();
        };
    }

    // GENERIC NAME PAGE
    var title = document.querySelector(".content__title"); // class from mainpage
    var pageName = document.querySelector(".list__page-name"); // place where insert generic page name
    var registration = document.querySelector(".regForm"); // account registration page


    if (title) pageName.innerHTML = "ГЛАВНАЯ";
    else if (registration) pageName.innerHTML = "РЕГИСТРАЦИЯ"

};


<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<!DOCTYPE html>
<html data-vivaldi-spatnav-clickable="1">

            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <style type="text/css">
                    .gm-style .gm-style-mtc label,
                    .gm-style .gm-style-mtc div {
                        font-weight: 400
                    }
                </style>
                <link type="text/css" rel="stylesheet" href="resources/css">
                <style type="text/css">
                    .gm-style .gm-style-cc span,
                    .gm-style .gm-style-cc a,
                    .gm-style .gm-style-mtc div {
                        font-size: 10px
                    }
                </style>
                <style type="text/css">
                    @media print {
                        .gm-style .gmnoprint,
                        .gmnoprint {
                            display: none
                        }
                    }
                    
                    @media screen {
                        .gm-style .gmnoscreen,
                        .gmnoscreen {
                            display: none
                        }
                    }
                </style>
                <style type="text/css">
                    .gm-style-pbc {
                        transition: opacity ease-in-out;
                        background-color: rgba(0, 0, 0, 0.45);
                        text-align: center
                    }
                    
                    .gm-style-pbt {
                        font-size: 22px;
                        color: white;
                        font-family: Roboto, Arial, sans-serif;
                        position: relative;
                        margin: 0;
                        top: 50%;
                        -webkit-transform: translateY(-50%);
                        -ms-transform: translateY(-50%);
                        transform: translateY(-50%)
                    }
                </style>
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta content="true" name="HandheldFriendly">
                <meta content="width" name="MobileOptimized">
                <meta content="yes" name="apple-mobile-web-app-capable">
                <link rel="shortcut icon" href="https://www.pestocafe.ua/storage/settings/ffbc1d14605237619fd1e2e89c2efbce.ico">
                
                <title>Ostap cafe</title>
                
                <link href="resources/css/index.css" rel="stylesheet">
                <!--relations!-->
                <script async="" src="https://www.google-analytics.com/analytics.js"></script>
                <script type="text/javascript" async="" src="resources/js/app.min.js"></script>
                <script type="text/javascript" async="" src="https://widget.siteheart.com/widget/sh/816475/uk/widget.js"></script>
                <script src="resources/js/jquery.js"></script>
                <script src="resources/js/jquery-ui.js"></script>
                <link rel="stylesheet" href="resources/css/jquery-ui.css">
                
                <script>
                    (function (i, s, o, g, r, a, m) {
                        i['GoogleAnalyticsObject'] = r;
                        i[r] = i[r] || function () {
                            (i[r].q = i[r].q || []).push(arguments)
                        }, i[r].l = 1 * new Date();
                        a = s.createElement(o)
                            , m = s.getElementsByTagName(o)[0];
                        a.async = 1;
                        a.src = g;
                        m.parentNode.insertBefore(a, m)
                    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
                    ga('create', 'UA-73022024-1', 'auto');
                    ga('send', 'pageview');
                    ga('require', 'ecommerce');
                </script>
                <meta name="google-site-verification" content="hnRSoumlA64Z1FvbazMscEl68wq2cXFhknuuw2LQOKE">
                <link rel="canonical" href="https://www.pestocafe.ua/">
                <meta name="it-rating" content="it-rat-f210fab804e51e3fbd84c6c5338c51d7">
                <link rel="stylesheet" href="data:text/css,@import%20url%28%27%20https%3A//static.tacdn.com/css2/build/less/widget/build/cdswidREST-v23785817177b.css%20%27%29%3B">
                <script type="text/javascript" src="resources/js/cdswidgets_m-c-v21072357980b.js"></script>
                <script type="text/javascript" charset="UTF-8" src="resources/js/common.js"></script>
                <script type="text/javascript" charset="UTF-8" src="resources/js/map.js"></script>
                <script type="text/javascript" charset="UTF-8" src="resources/js/util.js"></script>
                <script type="text/javascript" charset="UTF-8" src="resources/js/marker.js"></script>
                <script type="text/javascript" charset="UTF-8" src="resources/js/infowindow.js"></script>
                <style type="text/css">
                    .gm-style {
                        font: 400 11px Roboto, Arial, sans-serif;
                        text-decoration: none;
                    }
                    
                    .gm-style img {
                        max-width: none;
                    }
                </style>
                <script type="text/javascript" charset="UTF-8" src="resources/js/onion.js"></script>
                <script type="text/javascript" charset="UTF-8" src="resources/js/controls.js"></script>
                <meta name="viewport" content="width=device-width">
                <script type="text/javascript" charset="UTF-8" src="resources/js/stats.js"></script>
            </head>

            <body>
                <!-- Start SiteHeart code -->
                <script>
                    /*mobile*/
                    var useragents = ['android', 'astel', 'audiovox', 'blackberry', 'chtml', 'docomo', 'ericsson', 'hand', 'iphone ', 'ipod', '2me', 'ava', 'j-phone', 'kddi', 'lg', 'midp', 'mini', 'minimo', 'mobi', 'mobile', 'mobileexplorer', 'mot-e', 'motorola', 'mot-v', 'netfront', 'nokia', 'palm', 'palmos', 'palmsource', 'pda', 'pdxgw', 'phone', 'plucker', 'portable', 'portalmmm', 'sagem', 'samsung', 'sanyo', 'sgh', 'sharp', 'sie-m', 'sie-s', 'smartphone', 'softbank', 'sprint', 'symbian', 'telit', 'tsm', 'vodafone', 'wap', 'windowsce', 'wml', 'xiino'];
                    var agt = navigator.userAgent.toLowerCase();
                    var is_mobile = false;
                    for (i = 0; i < useragents.length; i++) {
                        if (agt.indexOf(useragents[i]) != -1) {
                            is_mobile = true;
                            user_agent = agt;
                            break;
                        }
                    }
                    /*!mobile*/
                    if (!is_mobile) {
                        (function () {
                            var widget_id = 816475;
                            _shcp = [{
                                widget_id: widget_id
                            }];
                            var lang = (navigator.language || navigator.systemLanguage || navigator.userLanguage || "en").substr(0, 2).toLowerCase();
                            var url = "widget.siteheart.com/widget/sh/" + widget_id + "/" + lang + "/widget.js";
                            var hcc = document.createElement("script");
                            hcc.type = "text/javascript";
                            hcc.async = true;
                            hcc.src = ("https:" == document.location.protocol ? "https" : "http") + "://" + url;
                            var s = document.getElementsByTagName("script")[0];
                            s.parentNode.insertBefore(hcc, s.nextSibling);
                        })();
                    }
                </script>
                <!-- End SiteHeart code -->
                <!--header_dropdown!-->
                <div class="preloader" style="display: none;">
                    <div style="text-align:center;"><img src="resources/img/preloader_logo.png" class="preloader_img"></div> <img src="resources/img/preloader-action.gif"> </div>
                <!--ALL!-->
                <div class="all">
                    <!--Video-->
                    <div class="container_video" style="background: url(resources/img/fon.jpg); height: 714px;">
                        <div class="shadow_block"></div>
                        <div class="content">
                            <div class="container">
                                <div class="row row_home">
                                    <div class="col-xs-4 header_column">
                                        <div class="tel">
                                            <p class="feedback_link_home">Contact us</p>                                            
                                            <p class="tel_link tel_link_home"> 067 <span class="point point_home">•</span> 67 <span class="point point_home">•</span> 55 <span class="point point_home">•</span> 230</p>
                                            <div class="clear"></div>
                                        </div>
                                    </div>
                                    <div class="col-xs-4 header_column center">
                                        <div class="logo">
                                            <a href="/"><img src="resources/img/cafe-logo.png" alt="Cafe" title="Cafe"></a>
                                        </div>
                                        <div itemscope="" itemtype="http://schema.org/Organization" style="display: none"> <a itemprop="url" href="https://www.pestocafe.ua/">Home</a> <img itemprop="logo" src="resources/img/logo_home.png"> </div>
                                    </div>
                                    <div class="col-xs-4 header_column">
                                       <h1 class="text-center">${message}</h1>
                                       <br>
                                        <sec:authorize access="isAnonymous()">
                                            <div class="login">
                                                <a class="transparent_btn entry" href="/login" data-vivaldi-spatnav-clickable="1">Login</a>
                                            </div>
                                            <div class="login">
                                                <a class="transparent_btn entry" href="/registration" data-vivaldi-spatnav-clickable="1">Register</a>
                                            </div>
                                        </sec:authorize>
                                        <sec:authorize access="hasRole('ROLE_ADMIN')">
                                            <div class="login">
                                                <a class="transparent_btn entry" href="/admin" data-vivaldi-spatnav-clickable="1">Admin</a>
                                            </div>
                                        </sec:authorize>
                                        <sec:authorize access="isAuthenticated()">
					                        <div class="login">
                                               <form:form action="/logout">
						                            <button class="transparent_btn entry" data-vivaldi-spatnav-clickable="1">Logout</button>					                            
					                           </form:form>                                                
                                            </div>
				                        </sec:authorize>
                                    </div>
                                </div>
                                <div class="container">
                                    <div class="row center">
                                        <div class="button_container">
                                            <a href="/" class="button button_left">Menu</a><a href="/" class="button button_right">Reserve a Table</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mouse" data-vivaldi-spatnav-clickable="1"> </div>
                        <!--</div>-->
                        <div class="clear"></div>
                    </div>
                    <!--Video-->
                    <!--section!-->
                    <div class="section section_slider white" style="background: url(resources/img/fon2.jpg); height: 714px;">
                        <div class="container container_main_restaurnt">
                            <div class="section_headline">Menu</div>
                            <div class="section_branch"></div>
                            <!--carousel!-->
                            <div class="carousel slick-initialized slick-slider">
                                <button type="button" class="slick-prev slick-arrow slick-disabled" aria-disabled="true" style="display: block;" data-vivaldi-spatnav-clickable="1"></button>
                                <div aria-live="polite" class="slick-list draggable" data-vivaldi-spatnav-clickable="1">
                                    <div class="slick-track" style="opacity: 1; width: 6980px; transform: translate3d(0px, 0px, 0px);" role="listbox">
                                       <c:forEach var="meal" items="${meals}">
                                       <div class="slick-slide slick-current slick-active" style="width: 349px;" tabindex="0" role="option" aria-describedby="slick-slide00" data-slick-index="0" aria-hidden="false">
                                            <!--item!-->
                                            <div class="item_container">
                                                <div class="label_row"> </div>
                                                <div class="item">
                                                    <div class="animate-cart">
                                                        <div class="circle-cart"> <i class="fa fa-shopping-basket"></i> </div>
                                                    </div>
                                                    <div class="item_image">
                                                        <a href="/" tabindex="0"> <img src="resources/img/dorada.jpeg"> </a>
                                                        <div class="clear"></div>
                                                    </div>
                                                    <div class="hover">
                                                        <div class="item_category">
                                                            <p>Hot meals</p>
                                                        </div>
                                                        <div class="item_headline"> <a class="item_headline_link" href="/" tabindex="0"><span>${meal.name}</span></a> </div>
                                                        <div class="hide">
                                                            <div class="reyting">
                                                                <div data-id="67" data-model="eyJpdiI6IjBCNlJxRUxpV3d4N1JsdVZiT1lcL1FRPT0iLCJ2YWx1ZSI6IjRKdSs2bmxSYStXYVg5SkVib0MrWGc9PSIsIm1hYyI6Ijk5YTE5ZjY4NTBjM2FiMjBhZjU2YTk1MGRiNjhhNTIxYTNjZjA3NzM1YjgzNDg4MTU2MzMxOGYxZDQ1ZmZlYzEifQ==" class="reyting"> <span data-jq-rating="" data-jq-rating-editable="true" data-jq-rating-value="4.0333" data-jq-rating-stars-count="5" data-jq-rating-based-on="5" class="jq-rating jq-rating--editable jq-rating--level-high" data-vivaldi-spatnav-clickable="1" style="position: relative; display: inline-block;">
        <input class="reyting_input" type="hidden" data-jq-rating-grade="" tabindex="0" value="4.0333">
    <span class="jq-rating-group" style="top: 0px; left: 0px;"><span class="jq-rating-star" style="display: inline-block;"><i class="fa fa-star"></i></span><span class="jq-rating-star" style="display: inline-block;"><i class="fa fa-star"></i></span><span class="jq-rating-star" style="display: inline-block;"><i class="fa fa-star"></i></span><span class="jq-rating-star" style="display: inline-block;"><i class="fa fa-star"></i></span><span class="jq-rating-star" style="display: inline-block;"><i class="fa fa-star"></i></span></span><span class="jq-rating-group--hover" style="position: absolute; top: 0px; left: 0px; overflow: hidden; white-space: nowrap; width: 80.666%;"><span class="jq-rating-star" style="display: inline-block;"><i class="fa fa-star"></i></span><span class="jq-rating-star" style="display: inline-block;"><i class="fa fa-star"></i></span><span class="jq-rating-star" style="display: inline-block;"><i class="fa fa-star"></i></span><span class="jq-rating-star" style="display: inline-block;"><i class="fa fa-star"></i></span><span class="jq-rating-star" style="display: inline-block;"><i class="fa fa-star"></i></span></span><span class="jq-rating-group--hover jq-rating-group--interaction" style="position: absolute; top: 0px; left: 0px; overflow: hidden; white-space: nowrap;"><span class="jq-rating-star" data-vivaldi-spatnav-clickable="1" style="color: transparent;"><i class="fa fa-star"></i></span><span class="jq-rating-star" data-vivaldi-spatnav-clickable="1" style="color: transparent;"><i class="fa fa-star"></i></span><span class="jq-rating-star" data-vivaldi-spatnav-clickable="1" style="color: transparent;"><i class="fa fa-star"></i></span><span class="jq-rating-star" data-vivaldi-spatnav-clickable="1" style="color: transparent;"><i class="fa fa-star"></i></span><span class="jq-rating-star" data-vivaldi-spatnav-clickable="1" style="color: transparent;"><i class="fa fa-star"></i></span></span>
                                                                    </span>
                                                                    <div class="message"></div>
                                                                </div>
                                                                <div class="message"></div>
                                                            </div>
                                                            <div class="weight_row">
                                                                <div class="weight">${meal.weight} gr</div>
                                                            </div>
                                                            <div class="short_description">
                                                                <p>${meal.fullDescription}</p>
                                                            </div>
                                                        </div>
                                                        <div class="price_row">
                                                            <div class="price">
                                                                <p class="price_value">${meal.price}</p>
                                                                <p class="price_text">$</p>
                                                            </div>
                                                        </div>
                                                        <sec:authorize access="isAuthenticated()">
                                                            <div class="buy_row">
                                                                <a data-price="249.00" data-count="1" type="button" class="btn buy btn-cart " onclick="Cart.addToCart(67,249, 1,$(this))" tabindex="0"> <span class="buy_headline">Order</span> <span class="buy_steps">
                                                                <i class="steps_nav minus">-</i>
                                                                <i class="steps_val" data-row-id="">1</i>
                                                                <i class="steps_nav plus">+</i>
                                                                </span> </a>
                                                            </div>
                                                        </sec:authorize>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--item!-->
                                        </div>
                                       </c:forEach>
                                    </div>
                                </div>
                                <button type="button" class="slick-next slick-arrow" style="display: block;" data-vivaldi-spatnav-clickable="1" aria-disabled="false"></button>
                            </div>
                            <!--carousel!-->
                        </div>
                    </div>
                    <!--section!-->
                    <!--map!-->
                    <div class="map_container">
                        <div class="map_caption"><span class="map_caption_text">Find us</span></div>
                        <div id="map" class="map" style="position: relative; overflow: hidden;">
                            <div style="height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; background-color: rgb(229, 227, 223);">
                                <div class="gm-style" style="position: absolute; z-index: 0; left: 0px; top: 0px; height: 100%; width: 100%; padding: 0px; border-width: 0px; margin: 0px;">
                                    <div tabindex="0" style="position: absolute; z-index: 0; left: 0px; top: 0px; height: 100%; width: 100%; padding: 0px; border-width: 0px; margin: 0px; cursor: url(&quot;https://maps.gstatic.com/mapfiles/openhand_8_8.cur&quot;) 8 8, default;" data-vivaldi-spatnav-clickable="1">
                                        <div style="z-index: 1; position: absolute; top: 0px; left: 0px; width: 100%; transform-origin: 0px 0px 0px; transform: matrix(1, 0, 0, 1, 0, 0);">
                                            <div style="position: absolute; left: 0px; top: 0px; z-index: 100; width: 100%;">
                                                <div style="position: absolute; left: 0px; top: 0px; z-index: 0;">
                                                    <div aria-hidden="true" style="position: absolute; left: 0px; top: 0px; z-index: 1; visibility: inherit;">
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 593px; top: 115px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 337px; top: 115px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 593px; top: -141px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 593px; top: 371px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 849px; top: 115px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 337px; top: 371px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 337px; top: -141px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 849px; top: -141px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 849px; top: 371px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 1105px; top: 115px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 81px; top: 115px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 1105px; top: 371px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 1105px; top: -141px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 81px; top: 371px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 81px; top: -141px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 1361px; top: 115px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: -175px; top: 115px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: -175px; top: -141px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 1361px; top: -141px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: -175px; top: 371px;"></div>
                                                        <div style="width: 256px; height: 256px; position: absolute; left: 1361px; top: 371px;"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="position: absolute; left: 0px; top: 0px; z-index: 101; width: 100%;"></div>
                                            <div style="position: absolute; left: 0px; top: 0px; z-index: 102; width: 100%;"></div>
                                            <div style="position: absolute; left: 0px; top: 0px; z-index: 103; width: 100%;">
                                                <div style="position: absolute; left: 0px; top: 0px; z-index: -1;">
                                                    <div aria-hidden="true" style="position: absolute; left: 0px; top: 0px; z-index: 1; visibility: inherit;">
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 593px; top: 115px;">
                                                            <canvas draggable="false" height="320" width="320" style="user-select: none; position: absolute; left: 0px; top: 0px; height: 256px; width: 256px;"></canvas>
                                                        </div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 337px; top: 115px;">
                                                            <canvas draggable="false" height="320" width="320" style="user-select: none; position: absolute; left: 0px; top: 0px; height: 256px; width: 256px;"></canvas>
                                                        </div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 593px; top: -141px;">
                                                            <canvas draggable="false" height="320" width="320" style="user-select: none; position: absolute; left: 0px; top: 0px; height: 256px; width: 256px;"></canvas>
                                                        </div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 593px; top: 371px;">
                                                            <canvas draggable="false" height="320" width="320" style="user-select: none; position: absolute; left: 0px; top: 0px; height: 256px; width: 256px;"></canvas>
                                                        </div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 849px; top: 115px;">
                                                            <canvas draggable="false" height="320" width="320" style="user-select: none; position: absolute; left: 0px; top: 0px; height: 256px; width: 256px;"></canvas>
                                                        </div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 337px; top: 371px;"></div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 337px; top: -141px;"></div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 849px; top: -141px;"></div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 849px; top: 371px;">
                                                            <canvas draggable="false" height="320" width="320" style="user-select: none; position: absolute; left: 0px; top: 0px; height: 256px; width: 256px;"></canvas>
                                                        </div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 1105px; top: 115px;"></div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 81px; top: 115px;"></div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 1105px; top: 371px;"></div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 1105px; top: -141px;"></div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 81px; top: 371px;"></div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 81px; top: -141px;"></div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 1361px; top: 115px;"></div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: -175px; top: 115px;"></div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: -175px; top: -141px;"></div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 1361px; top: -141px;"></div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: -175px; top: 371px;"></div>
                                                        <div style="width: 256px; height: 256px; overflow: hidden; position: absolute; left: 1361px; top: 371px;"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="position: absolute; left: 0px; top: 0px; z-index: 0;">
                                                <div aria-hidden="true" style="position: absolute; left: 0px; top: 0px; z-index: 1; visibility: inherit;">
                                                    <div style="position: absolute; left: 593px; top: 115px; transition: opacity 200ms ease-out;"><img src="resources/img/vt" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 337px; top: 115px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(1)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 593px; top: -141px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(2)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 337px; top: -141px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(3)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 849px; top: 371px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(4)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 849px; top: -141px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(5)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 337px; top: 371px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(6)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 849px; top: 115px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(7)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 593px; top: 371px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(8)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 1105px; top: 115px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(9)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 1105px; top: 371px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(10)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 81px; top: 115px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(11)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 1361px; top: 115px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(12)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 81px; top: -141px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(13)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: -175px; top: -141px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(14)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: -175px; top: 115px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(15)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 81px; top: 371px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(16)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 1105px; top: -141px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(17)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 1361px; top: -141px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(18)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: -175px; top: 371px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(19)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                    <div style="position: absolute; left: 1361px; top: 371px; transition: opacity 200ms ease-out;"><img src="resources/img/vt(20)" draggable="false" alt="" style="width: 256px; height: 256px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style="z-index: 2; position: absolute; height: 100%; width: 100%; padding: 0px; border-width: 0px; margin: 0px; left: 0px; top: 0px; opacity: 0;" class="gm-style-pbc">
                                            <p class="gm-style-pbt"></p>
                                        </div>
                                        <div style="z-index: 3; position: absolute; height: 100%; width: 100%; padding: 0px; border-width: 0px; margin: 0px; left: 0px; top: 0px;">
                                            <div style="z-index: 1; position: absolute; height: 100%; width: 100%; padding: 0px; border-width: 0px; margin: 0px; left: 0px; top: 0px;"></div>
                                        </div>
                                        <div style="z-index: 4; position: absolute; top: 0px; left: 0px; width: 100%; transform-origin: 0px 0px 0px; transform: matrix(1, 0, 0, 1, 0, 0);">
                                            <div style="position: absolute; left: 0px; top: 0px; z-index: 104; width: 100%;"></div>
                                            <div style="position: absolute; left: 0px; top: 0px; z-index: 105; width: 100%;"></div>
                                            <div style="position: absolute; left: 0px; top: 0px; z-index: 106; width: 100%;"></div>
                                            <div style="position: absolute; left: 0px; top: 0px; z-index: 107; width: 100%;"></div>
                                        </div>
                                    </div>
                                    <div style="margin-left: 5px; margin-right: 5px; z-index: 1000000; position: absolute; left: 0px; bottom: 0px;">
                                        <a target="_blank" href="https://maps.google.com/maps?ll=50.450231,30.513271&amp;z=11&amp;t=m&amp;hl=uk-UA&amp;gl=US&amp;mapclient=apiv3" title="Натисніть, щоб переглянути цю область у Картах Google" style="position: static; overflow: visible; float: none; display: inline;">
                                            <div style="width: 66px; height: 26px; cursor: pointer;"><img src="resources/img/google4_hdpi.png" draggable="false" style="position: absolute; left: 0px; top: 0px; width: 66px; height: 26px; user-select: none; border: 0px; padding: 0px; margin: 0px;"></div>
                                        </a>
                                    </div>
                                    <div style="background-color: white; padding: 15px 21px; border: 1px solid rgb(171, 171, 171); font-family: Roboto, Arial, sans-serif; color: rgb(34, 34, 34); box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 16px; z-index: 10000002; display: none; width: 256px; height: 148px; position: absolute; left: 593px; top: 170px;">
                                        <div style="padding: 0px 0px 10px; font-size: 16px;">Картографічні дані</div>
                                        <div style="font-size: 13px;">Дані карт ©2017 Google</div>
                                        <div data-vivaldi-spatnav-clickable="1" style="width: 13px; height: 13px; overflow: hidden; position: absolute; opacity: 0.7; right: 12px; top: 12px; z-index: 10000; cursor: pointer;"><img src="resources/img/mapcnt6.png" draggable="false" style="position: absolute; left: -2px; top: -336px; width: 59px; height: 492px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                    </div>
                                    <div class="gmnoprint" style="z-index: 1000001; position: absolute; right: 111px; bottom: 0px; width: 123px;">
                                        <div draggable="false" class="gm-style-cc" style="user-select: none; height: 14px; line-height: 14px;">
                                            <div style="opacity: 0.7; width: 100%; height: 100%; position: absolute;">
                                                <div style="width: 1px;"></div>
                                                <div style="background-color: rgb(245, 245, 245); width: auto; height: 100%; margin-left: 1px;"></div>
                                            </div>
                                            <div style="position: relative; padding-right: 6px; padding-left: 6px; font-family: Roboto, Arial, sans-serif; font-size: 10px; color: rgb(68, 68, 68); white-space: nowrap; direction: ltr; text-align: right; vertical-align: middle; display: inline-block;"><a data-vivaldi-spatnav-clickable="1" style="color: rgb(68, 68, 68); text-decoration: none; cursor: pointer; display: none;">Картографічні дані</a><span>Дані карт ©2017 Google</span></div>
                                        </div>
                                    </div>
                                    <div class="gmnoscreen" style="position: absolute; right: 0px; bottom: 0px;">
                                        <div style="font-family: Roboto, Arial, sans-serif; font-size: 11px; color: rgb(68, 68, 68); direction: ltr; text-align: right; background-color: rgb(245, 245, 245);">Дані карт ©2017 Google</div>
                                    </div>
                                    <div class="gmnoprint gm-style-cc" draggable="false" style="z-index: 1000001; user-select: none; height: 14px; line-height: 14px; position: absolute; right: 0px; bottom: 0px;">
                                        <div style="opacity: 0.7; width: 100%; height: 100%; position: absolute;">
                                            <div style="width: 1px;"></div>
                                            <div style="background-color: rgb(245, 245, 245); width: auto; height: 100%; margin-left: 1px;"></div>
                                        </div>
                                        <div style="position: relative; padding-right: 6px; padding-left: 6px; font-family: Roboto, Arial, sans-serif; font-size: 10px; color: rgb(68, 68, 68); white-space: nowrap; direction: ltr; text-align: right; vertical-align: middle; display: inline-block;"><a href="https://www.google.com/intl/uk-UA_US/help/terms_maps.html" target="_blank" style="text-decoration: none; cursor: pointer; color: rgb(68, 68, 68);">Умови використання</a></div>
                                    </div>
                                    <div data-vivaldi-spatnav-clickable="1" style="cursor: pointer; width: 25px; height: 25px; overflow: hidden; margin: 10px 14px; position: absolute; top: 0px; right: 0px;"><img src="resources/img/sv9.png" draggable="false" class="gm-fullscreen-control" style="position: absolute; left: -52px; top: -86px; width: 164px; height: 175px; user-select: none; border: 0px; padding: 0px; margin: 0px;"></div>
                                    <div draggable="false" class="gm-style-cc" style="user-select: none; height: 14px; line-height: 14px; display: none; position: absolute; right: 0px; bottom: 0px;">
                                        <div style="opacity: 0.7; width: 100%; height: 100%; position: absolute;">
                                            <div style="width: 1px;"></div>
                                            <div style="background-color: rgb(245, 245, 245); width: auto; height: 100%; margin-left: 1px;"></div>
                                        </div>
                                        <div style="position: relative; padding-right: 6px; padding-left: 6px; font-family: Roboto, Arial, sans-serif; font-size: 10px; color: rgb(68, 68, 68); white-space: nowrap; direction: ltr; text-align: right; vertical-align: middle; display: inline-block;"><a target="_new" title="Повідомити Google про помилки в картографічних даних або зображенні доріг" data-vivaldi-spatnav-clickable="1" href="https://www.google.com/maps/@50.450231,30.513271,11z/data=!10m1!1e1!12b1?source=apiv3&amp;rapsrc=apiv3" style="font-family: Roboto, Arial, sans-serif; font-size: 10px; color: rgb(68, 68, 68); text-decoration: none; position: relative;">Повідомити про помилку на карті</a></div>
                                    </div>
                                    <div class="gmnoprint gm-bundled-control gm-bundled-control-on-bottom" draggable="false" controlwidth="28" controlheight="93" style="margin: 10px; user-select: none; position: absolute; bottom: 107px; right: 28px;">
                                        <div class="gmnoprint" controlwidth="28" controlheight="55" style="position: absolute; left: 0px; top: 38px;">
                                            <div draggable="false" style="user-select: none; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; border-radius: 2px; cursor: pointer; background-color: rgb(255, 255, 255); width: 28px; height: 55px;">
                                                <div title="Збільшити" aria-label="Збільшити" tabindex="0" data-vivaldi-spatnav-clickable="1" style="position: relative; width: 28px; height: 27px; left: 0px; top: 0px;">
                                                    <div style="overflow: hidden; position: absolute; width: 15px; height: 15px; left: 7px; top: 6px;"><img src="resources/img/tmapctrl_hdpi.png" draggable="false" style="position: absolute; left: 0px; top: 0px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none; width: 120px; height: 54px;"></div>
                                                </div>
                                                <div style="position: relative; overflow: hidden; width: 67%; height: 1px; left: 16%; background-color: rgb(230, 230, 230); top: 0px;"></div>
                                                <div title="Зменшити" aria-label="Зменшити" tabindex="0" data-vivaldi-spatnav-clickable="1" style="position: relative; width: 28px; height: 27px; left: 0px; top: 0px;">
                                                    <div style="overflow: hidden; position: absolute; width: 15px; height: 15px; left: 7px; top: 6px;"><img src="resources/img/tmapctrl_hdpi.png" draggable="false" style="position: absolute; left: 0px; top: -15px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none; width: 120px; height: 54px;"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="gm-svpc" controlwidth="28" controlheight="28" data-vivaldi-spatnav-clickable="1" style="background-color: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; border-radius: 2px; width: 28px; height: 28px; cursor: url(&quot;https://maps.gstatic.com/mapfiles/openhand_8_8.cur&quot;) 8 8, default; position: absolute; left: 0px; top: 0px;">
                                            <div style="position: absolute; left: 1px; top: 1px;"></div>
                                            <div style="position: absolute; left: 1px; top: 1px;">
                                                <div aria-label="Чоловічок для перегляду вулиць" style="width: 26px; height: 26px; overflow: hidden; position: absolute; left: 0px; top: 0px;"><img src="resources/img/cb_scout5_hdpi.png" draggable="false" style="position: absolute; left: -147px; top: -26px; width: 215px; height: 835px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                <div aria-label="Чоловічок угорі карти" style="width: 26px; height: 26px; overflow: hidden; position: absolute; left: 0px; top: 0px; visibility: hidden;"><img src="resources/img/cb_scout5_hdpi.png" draggable="false" style="position: absolute; left: -147px; top: -52px; width: 215px; height: 835px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                                <div aria-label="Чоловічок для перегляду вулиць" style="width: 26px; height: 26px; overflow: hidden; position: absolute; left: 0px; top: 0px; visibility: hidden;"><img src="resources/img/cb_scout5_hdpi.png" draggable="false" style="position: absolute; left: -147px; top: -78px; width: 215px; height: 835px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                            </div>
                                        </div>
                                        <div class="gmnoprint" controlwidth="28" controlheight="0" style="display: none; position: absolute;">
                                            <div title="Обернути карту на 90 градусів" data-vivaldi-spatnav-clickable="1" style="width: 28px; height: 28px; overflow: hidden; position: absolute; border-radius: 2px; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; cursor: pointer; background-color: rgb(255, 255, 255); display: none;"><img src="resources/img/tmapctrl4_hdpi.png" draggable="false" style="position: absolute; left: -141px; top: 6px; width: 170px; height: 54px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                            <div class="gm-tilt" data-vivaldi-spatnav-clickable="1" style="width: 28px; height: 28px; overflow: hidden; position: absolute; border-radius: 2px; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; top: 0px; cursor: pointer; background-color: rgb(255, 255, 255);"><img src="resources/img/tmapctrl4_hdpi.png" draggable="false" style="position: absolute; left: -141px; top: -13px; width: 170px; height: 54px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"></div>
                                        </div>
                                    </div>
                                    <div class="gmnoprint" style="margin: 10px; z-index: 0; position: absolute; cursor: pointer; left: 0px; top: 0px;">
                                        <div class="gm-style-mtc" style="float: left;">
                                            <div draggable="false" title="Показати карту вулиць" data-vivaldi-spatnav-clickable="1" style="direction: ltr; overflow: hidden; text-align: center; position: relative; color: rgb(0, 0, 0); font-family: Roboto, Arial, sans-serif; user-select: none; font-size: 11px; background-color: rgb(255, 255, 255); padding: 8px; border-bottom-left-radius: 2px; border-top-left-radius: 2px; -webkit-background-clip: padding-box; background-clip: padding-box; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; min-width: 30px; font-weight: 500;">Карта</div>
                                            <div style="background-color: white; z-index: -1; padding: 2px; border-bottom-left-radius: 2px; border-bottom-right-radius: 2px; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; position: absolute; left: 0px; top: 29px; text-align: left; display: none;">
                                                <div draggable="false" title="Показати карту вулиць із ландшафтом" data-vivaldi-spatnav-clickable="1" style="color: rgb(0, 0, 0); font-family: Roboto, Arial, sans-serif; user-select: none; font-size: 11px; background-color: rgb(255, 255, 255); padding: 6px 8px 6px 6px; direction: ltr; text-align: left; white-space: nowrap;"><span role="checkbox" style="box-sizing: border-box; position: relative; line-height: 0; font-size: 0px; margin: 0px 5px 0px 0px; display: inline-block; background-color: rgb(255, 255, 255); border: 1px solid rgb(198, 198, 198); border-radius: 1px; width: 13px; height: 13px; vertical-align: middle;"><div style="position: absolute; left: 1px; top: -2px; width: 13px; height: 11px; overflow: hidden; display: none;"><img src="resources/img/imgs8.png" draggable="false" style="position: absolute; left: -52px; top: -44px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none; width: 68px; height: 67px;"></div></span>
                                                    <label style="vertical-align: middle; cursor: pointer;">Ландшафт</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="gm-style-mtc" style="float: left;">
                                            <div draggable="false" title="Показати зображення із супутника" data-vivaldi-spatnav-clickable="1" style="direction: ltr; overflow: hidden; text-align: center; position: relative; color: rgb(86, 86, 86); font-family: Roboto, Arial, sans-serif; user-select: none; font-size: 11px; background-color: rgb(255, 255, 255); padding: 8px; border-bottom-right-radius: 2px; border-top-right-radius: 2px; -webkit-background-clip: padding-box; background-clip: padding-box; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; border-left: 0px; min-width: 47px;">Супутник</div>
                                            <div style="background-color: white; z-index: -1; padding: 2px; border-bottom-left-radius: 2px; border-bottom-right-radius: 2px; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; position: absolute; right: 0px; top: 29px; text-align: left; display: none;">
                                                <div draggable="false" title="Показати зображення з назвами вулиць" data-vivaldi-spatnav-clickable="1" style="color: rgb(0, 0, 0); font-family: Roboto, Arial, sans-serif; user-select: none; font-size: 11px; background-color: rgb(255, 255, 255); padding: 6px 8px 6px 6px; direction: ltr; text-align: left; white-space: nowrap;"><span role="checkbox" style="box-sizing: border-box; position: relative; line-height: 0; font-size: 0px; margin: 0px 5px 0px 0px; display: inline-block; background-color: rgb(255, 255, 255); border: 1px solid rgb(198, 198, 198); border-radius: 1px; width: 13px; height: 13px; vertical-align: middle;"><div style="position: absolute; left: 1px; top: -2px; width: 13px; height: 11px; overflow: hidden;"><img src="resources/img/imgs8.png" draggable="false" style="position: absolute; left: -52px; top: -44px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none; width: 68px; height: 67px;"></div></span>
                                                    <label style="vertical-align: middle; cursor: pointer;">Мітки</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--map!-->
                    
                    <div class="empty_footer" style="height: 326px;"></div>
                </div>
                <!--FOOTER!-->
                <footer style="height: 326px; margin-top: -326px;">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-3 column_1">
                                <div class="copyright">
                                    <p>&copy; 2017 Ostap Lozinskyj
                                    <br>All trademarks and registered trademarks appearing on this site are the property of their respective owners.</p>
                                </div>
                                
                                Made with support:
                                <img src="resources/img/logos.png" style="background: gray; height: 50px;">
                            </div>   
                        </div>
                    </div>
                </footer>
                <!--FOOTER!-->
                            
                <a class="scroll-top" href="javascript:;" style="display: none;"></a>
                <!--relations!-->
                
                <script src="resources/js/9f1951474454579b5748d0ff2d3c5c9a38014687387.js"></script>
                <script>
                    App.lang = 'ru';
                    App.prepareLangSegment();
                    App.token = '5vScC9REQRlnDL1uSmF2dYIFpg1BnLaNlFgZJFC9';
                </script>
                <script src="resources/js/js"></script>
                <script src="resources/js/map.js(1)"></script>
                <script>
                    $(function () {
                        Map.init([{
                            "id": 1
                            , "number": "PESTO CAF\u00c9 \u043d\u0430 \u041b\u043e\u0431\u0430\u043d\u043e\u0432\u0441\u043a\u043e\u0433\u043e"
                            , "address": "\u043f\u0440-\u0442 \u041b\u043e\u0431\u0430\u043d\u043e\u0432\u0441\u043a\u043e\u0433\u043e (\u041a\u0440\u0430\u0441\u043d\u043e\u0437\u0432\u0435\u0437\u0434\u043d\u044b\u0439), 4\u0414, \u0422\u0426 NOVUS, 2 \u044d\u0442\u0430\u0436"
                            , "latitude": "50.422866"
                            , "longitude": "30.464363"
                            , "preview": "\/storage\/tb-restaurant\/2016\/01\/28\/220x80\/be7a86805eb4c78c888c95e788a5e8fb_1454014302_80.jpeg"
                            , "icon": "https:\/\/www.pestocafe.ua\/images\/marker.png"
                        }, {
                            "id": 2
                            , "number": "PESTO CAF\u00c9 \u043d\u0430 \u041f\u043e\u0437\u043d\u044f\u043a\u0430\u0445"
                            , "address": "\u043c. \u041f\u043e\u0437\u043d\u044f\u043a\u0438, \u0443\u043b. \u0410\u043d\u043d\u044b \u0410\u0445\u043c\u0430\u0442\u043e\u0432\u043e\u0439, 30"
                            , "latitude": "50.407821"
                            , "longitude": "30.622668"
                            , "preview": "\/storage\/tb-restaurant\/2016\/01\/28\/220x80\/355dd49b30aa794dd15f7d313f112396_1454015326_80.jpeg"
                            , "icon": "https:\/\/www.pestocafe.ua\/images\/marker.png"
                        }, {
                            "id": 3
                            , "number": "PESTO CAF\u00c9 \u0432 \u041c\u0430\u0433\u0435\u043b\u0430\u043d\u0435"
                            , "address": "\u043c. \u0422\u0435\u0440\u0435\u043c\u043a\u0438, \u043f\u0440-\u0442. \u0410\u043a\u0430\u0434\u0435\u043c\u0438\u043a\u0430 \u0413\u043b\u0443\u0448\u043a\u043e\u0432\u0430, 13\u0411, \u0422\u0420\u0426 \u041c\u0430\u0433\u0435\u043b\u0430\u043d, 3 \u044d\u0442\u0430\u0436"
                            , "latitude": "50.367924"
                            , "longitude": "30.458070"
                            , "preview": "\/storage\/tb-restaurant\/2016\/01\/13\/220x80\/1906026724e0746351f036083cc7a250_1452677757_80.jpeg"
                            , "icon": "https:\/\/www.pestocafe.ua\/images\/marker.png"
                        }, {
                            "id": 4
                            , "number": "PESTO CAF\u00c9 \u041e\u0431\u043e\u043b\u043e\u043d\u044c"
                            , "address": "\u043c. \u041c\u0438\u043d\u0441\u043a\u0430\u044f, \u043f\u0440-\u0442. \u0413\u0435\u0440\u043e\u0435\u0432 \u0421\u0442\u0430\u043b\u0438\u043d\u0433\u0440\u0430\u0434\u0430, 27"
                            , "latitude": "50.508512"
                            , "longitude": "30.506465"
                            , "preview": "\/storage\/tb-restaurant\/2016\/01\/30\/220x80\/e9af332522d0f29cccc9a647b051832f_1454178351_80.jpeg"
                            , "icon": "https:\/\/www.pestocafe.ua\/images\/marker.png"
                        }, {
                            "id": 5
                            , "number": "PESTO CAF\u00c9 \u043d\u0430 \u043c \u0416\u0438\u0442\u043e\u043c\u0438\u0440\u0441\u043a\u0430\u044f"
                            , "address": "\u043f\u0440-\u0442. \u041f\u043e\u0431\u0435\u0434\u044b, 136, \u0422\u0426 VMB, 2 \u044d\u0442\u0430\u0436"
                            , "latitude": "50.456776"
                            , "longitude": "30.365465"
                            , "preview": "\/storage\/tb-restaurant\/2016\/01\/26\/220x80\/0e3a0644a0889970bd661eabec238679_1453761328_80.jpeg"
                            , "icon": "https:\/\/www.pestocafe.ua\/images\/marker.png"
                        }, {
                            "id": 6
                            , "number": "PESTO CAF\u00c9 \u043d\u0430 \u0420\u0443\u0441\u0430\u043d\u043e\u0432\u043a\u0435"
                            , "address": "\u043c. \u041b\u0435\u0432\u043e\u0431\u0435\u0440\u0435\u0436\u043d\u0430\u044f, \u0420\u0443\u0441\u0430\u043d\u043e\u0432\u0441\u043a\u0430\u044f \u043d\u0430\u0431\u0435\u0440\u0435\u0436\u043d\u0430\u044f, 8"
                            , "latitude": "50.437123"
                            , "longitude": "30.592794"
                            , "preview": "\/storage\/tb-restaurant\/2016\/02\/26\/220x80\/5b6d57e66a49ad6b63bad1bc5c1e13a0_1456485192_80.jpeg"
                            , "icon": "https:\/\/www.pestocafe.ua\/images\/marker.png"
                        }, {
                            "id": 7
                            , "number": "PESTO CAF\u00c9 \u041e\u0440\u043d\u0430\u043c\u0435\u043d\u0442"
                            , "address": "\u043f\u0440-\u0442. \u041f\u0440\u0430\u0432\u0434\u044b, 58\u0410, \u0422\u0426 \u041e\u0440\u043d\u0430\u043c\u0435\u043d\u0442, 2 \u044d\u0442\u0430\u0436"
                            , "latitude": "50.505215"
                            , "longitude": "30.437601"
                            , "preview": "\/storage\/tb-restaurant\/2016\/05\/20\/220x80\/f31b8a89a4f8010ffedf44213f94315f_1463750837_80.jpeg"
                            , "icon": "https:\/\/www.pestocafe.ua\/images\/marker.png"
                        }, {
                            "id": 8
                            , "number": "PESTO CAF\u00c9 \u0413\u043b\u043e\u0431\u0443\u0441"
                            , "address": "\u041f\u043b\u043e\u0449\u0430\u0434\u044c \u041d\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043c\u043e\u0441\u0442\u0438,1,\u0422\u0426 GLOBUS 2 , 3 \u044d\u0442\u0430\u0436"
                            , "latitude": "50.450993"
                            , "longitude": "30.522495"
                            , "preview": "\/storage\/tb-restaurant\/2017\/03\/07\/220x80\/db2a791a7be7b6febcfc9acdb7145ad9_1488901167_80.jpeg"
                            , "icon": "https:\/\/www.pestocafe.ua\/images\/marker.png"
                        }, {
                            "id": 9
                            , "number": "PESTO CAFE \u041e\u0441\u043e\u043a\u043e\u0440\u043a\u0438"
                            , "address": "\u0414\u043d\u0435\u043f\u0440\u043e\u0432\u0441\u043a\u0430\u044f \u043d\u0430\u0431\u0435\u0440\u0435\u0436\u043d\u0430\u044f 33, \u0422\u0426 \u0410\u0440\u043a\u0430\u0434\u0438\u044f, 2 \u044d\u0442\u0430\u0436 "
                            , "latitude": "50.399598"
                            , "longitude": "30.616680"
                            , "preview": "\/storage\/tb-restaurant\/2017\/08\/30\/220x80\/c69011f6afacdef99ff7d1fee97f2f87_1504041019_80.jpeg"
                            , "icon": "https:\/\/www.pestocafe.ua\/images\/marker.png"
                        }]);
                    });
                </script>                     
            </body>

            </html>
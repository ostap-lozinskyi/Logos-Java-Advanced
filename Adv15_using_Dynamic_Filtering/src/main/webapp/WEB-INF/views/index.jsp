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
                <script src="resources/js/jquery.js"></script>
                <script src="resources/js/jquery-ui.js"></script>
                <link rel="stylesheet" href="resources/css/jquery-ui.css">
                
                
                <meta name="google-site-verification" content="hnRSoumlA64Z1FvbazMscEl68wq2cXFhknuuw2LQOKE">
                <link rel="canonical" href="https://www.pestocafe.ua/">
                <meta name="it-rating" content="it-rat-f210fab804e51e3fbd84c6c5338c51d7">
                <link rel="stylesheet" href="data:text/css,@import%20url%28%27%20https%3A//static.tacdn.com/css2/build/less/widget/build/cdswidREST-v23785817177b.css%20%27%29%3B">                
                <style type="text/css">
                    .gm-style {
                        font: 400 11px Roboto, Arial, sans-serif;
                        text-decoration: none;
                    }
                    
                    .gm-style img {
                        max-width: none;
                    }
                </style>
                <meta name="viewport" content="width=device-width">                
            </head>

            <body>
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
                                <div class="row center">
                                    <div class="button_container">
                                        <a href="/mealMenu" class="button button_left">Menu</a><a href="/" class="button button_right">Reserve a Table</a>
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
                    <div class="section section_slider white" style="background: url(resources/img/fon2.jpg); height: 1714px;">
                        <div class="container container_main_restaurnt">
                            <div class="section_headline">Menu</div>
                            <div class="section_branch"></div>
                            <!--carousel!-->
                            <div class="carousel slick-initialized slick-slider">                                
                                <div aria-live="polite" class="slick-list draggable" data-vivaldi-spatnav-clickable="1">
                                    <div class="slick-track" style="opacity: 1; width: 6980px; transform: translate3d(0px, 0px, 0px);" role="listbox">
                                       <c:forEach var="meal" items="${meals.content}">
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
                                                            <div class="buy_row">
                                                                <sec:authorize access="isAnonymous()">
                                                                <a href="/login" type="button" class="btn buy btn-cart ">Order</a>
                                                                </sec:authorize>
                                                                                                                                
                                                                <sec:authorize access="isAuthenticated()">
                                                                <a data-price="249.00" data-count="1" type="button" class="btn buy btn-cart " onclick="Cart.addToCart(67,249, 1,$(this))" tabindex="0"> <span class="buy_headline">Order</span> <span class="buy_steps">
                                                                <i class="steps_nav minus">-</i>
                                                                <i class="steps_val" data-row-id="">1</i>
                                                                <i class="steps_nav plus">+</i>
                                                                </span> </a>
                                                                </sec:authorize>
                                                            </div>                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <!--item!-->
                                        </div>
                                       </c:forEach>
                                    </div>
                                </div>
                                
                            </div>
                            <!--carousel!-->
                        </div>
                    </div>
                    <!--section!-->
                    <!--map!-->
                    
                       
                        <div class="col-xs-12 text-center">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29112.343557341348!2d23.992958218503922!3d49.83885086658292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add67a0879827%3A0xc68944e5293256f2!2sIT+Academy+Logos!5e0!3m2!1suk!2sua!4v1504697969891" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>
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
                                 
            </body>

            </html>
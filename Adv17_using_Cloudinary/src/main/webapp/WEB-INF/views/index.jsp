<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
    <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
        <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
            <%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
                <!DOCTYPE html>
                <html>

                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <link rel="shortcut icon" href="/resources/img/cafe.ico">
                    <title>Ostap cafe</title>
                    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
					<link rel="stylesheet" href="resources/css/rateStars.css" type="text/css"/>
                    
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
                    
                    <link href="/resources/css/index.css" rel="stylesheet">
                    <script src="/resources/js/jquery.js"></script>
                    <script src="/resources/js/jquery-ui.js"></script>
                </head>

                <body>
                    <div class="container_video" style="background: url(/resources/img/fon.jpg); height: 714px;">
                        <div class="shadow_block"></div>
                        <div class="content">
                            <div class="container">
                                <div class="row row_home">
                                    <div class="col-4 header_column">                                           
                                        <p class="feedback_link_home">Contact us</p>
                                        <p class="tel_link tel_link_home"> +380 <span class="point point_home">•</span> 67 <span class="point point_home">•</span> 67 <span class="point point_home">•</span> 55 <span class="point point_home">•</span> 230</p>
                                    </div>
                                    <div class="col-4 header_column center">
                                        <div class="logo">
                                            <a href="/"><img src="/resources/img/cafe-logo.png" alt="Cafe" title="Cafe"></a>
                                        </div>
                                    </div>
                                    <div class="col-4 header_column">
                                        <h1 class="text-center">${message}</h1>
                                        <br>
                                        <div class="row">
                                            <div class="col-6">
                                                <sec:authorize access="isAnonymous()">
                                                    <a class="transparent_btnCafe entry" href="/registration">Register</a> 
                                                </sec:authorize>
                                                <sec:authorize access="hasRole('ROLE_CLIENT')">
                                                    <a class="transparent_btnCafe entry" href="/userCabinet" >Cabinet</a>
                                                </sec:authorize>
                                                <sec:authorize access="hasRole('ROLE_ADMIN')">
                                                    <a class="transparent_btnCafe entry" href="/admin" >Admin</a>
                                                </sec:authorize>
                                            </div>
                                            <div class="col-6">
                                                <sec:authorize access="isAnonymous()">
                                                    <a class="transparent_btnCafe entry" href="/login">Login</a>                                              
                                                </sec:authorize>
                                                <sec:authorize access="isAuthenticated()">
                                                    <form:form action="/logout">
                                                        <button class="transparent_btnCafe entry">Logout</button>
                                                    </form:form>
                                                </sec:authorize>
                                            </div>
                                        </div>                                        
                                    </div>
                                </div>
                                <div class="row center">
                                    <div class="col-12">
                                        <div class="button_container"> <a href="/meal" class="button button_left">Menu</a><a href="/place" class="button button_right">Tables</a> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mouse"> </div>
                        <!--</div>-->
                        <div class="clear"></div>
                    </div>
                    <!--section!-->
                    <div style="background: url(/resources/img/fon2.jpg); height: 1214px;">
                        <div class="container container_main_restaurnt">
                            <div class="row">
                                <div class="col-12 center">
                                    <br><h1>Menu</h1>
                                </div>
                            </div>                            
                            <div class="section_branch"></div>
                            <!--carousel!-->
                            <div>
                                <div>
                                    <div>
                                        <div class="row">
                                            <c:forEach var="meal" items="${meals}" end="2">
                                                <div class="col-4">
                                                    <div>
                                                        <!--item!-->
                                                        <div class="item_container">
                                                            <div class="label_row"> </div>
                                                            <div class="item">
                                                                <div class="item_image">
                                                                    <a href="/" tabindex="0"> <img src="${meal.photoUrl}?version=${meal.version}"> </a>
                                                                    <div class="clear"></div>
                                                                </div>
                                                                <div class="hover">
                                                                    <div class="item_category">
                                                                        <p>Hot meals</p>
                                                                    </div>
                                                                    <div class="item_headline"> 
                                                                    	<a href="/meal/${meal.id}"><span>${meal.name}</span></a>
                                                                    </div>
                                                                    <div class="hide">
                                                                        <div class="reyting">
                                                                            <div class="message"></div>
                                                                            <form:form action="/meal/${meal.id}" method="POST"
																				modelAttribute="meal">current rate=${meal.rate}<div class="star-rating">
																					<div class="star-rating__wrap">
																						<input class="star-rating__input fa" id="star-rating-5" type="radio" name="rate" value="5" title="5 out of 5 stars"> 
																						<input class="star-rating__input fa" id="star-rating-4"	type="radio" name="rate" value="4" title="4 out of 5 stars">
																						<input class="star-rating__input fa" id="star-rating-3"	type="radio" name="rate" value="3" title="3 out of 5 stars"> 
																						<input class="star-rating__input fa" id="star-rating-2"	type="radio" name="rate" value="2" title="2 out of 5 stars"> 
																						<input class="star-rating__input fa" id="star-rating-1"	type="radio" name="rate" value="1" title="1 out of 5 stars">
																					</div>
																				</div>
																				<sec:authorize access="isAuthenticated()">
																					<button>Ok</button>
																				</sec:authorize>
																			</form:form>
                                                                        </div>
                                                                        <div class="weight_row">
                                                                            <div class="weight">${meal.weight} gr</div>
                                                                        </div>
                                                                        <div class="short_description">
                                                                            <p>${meal.shortDescription}</p>
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
                                                                            <a href="/login">
                                                                                <button type="button" class="btn-cart buy btnCafe btn-sucsess btn-lg">Order</button>
                                                                            </a>
                                                                        </sec:authorize>
                                                                        <sec:authorize access="isAuthenticated()">
                                                                            <a href="/place">
                                                                                <button type="button" class="btn-cart buy btnCafe btn-sucsess btn-lg">Order</button>
                                                                            </a>
                                                                        </sec:authorize>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!--item!-->
                                                    </div>
                                                </div>
                                            </c:forEach>
                                        </div>
                                        <div class="row">
                                            <c:forEach var="meal" items="${meals}" begin="3" end="4">
                                                <div class="col-6">
                                                    <div>
                                                        <br>
                                                        <div class="item_container">
                                                            <div class="label_row"> </div>
                                                            <div class="item">
                                                                <div class="item_image">
                                                                    <a href="/" tabindex="0"> <img src="${meal.photoUrl}?version=${meal.version}"> </a>
                                                                    <div class="clear"></div>
                                                                </div>
                                                                <div class="hover">
                                                                    <div class="item_category">
                                                                        <p>Hot meals</p>
                                                                    </div>
                                                                    <div class="item_headline"> 
                                                                    	<a href="/meal/${meal.id}"><span>${meal.name}</span></a>
                                                                    </div>
                                                                    <div class="hide">
                                                                        <div class="reyting">
                                                                            <div class="message"></div>
                                                                            <form:form action="/meal/${meal.id}" method="POST"
																				modelAttribute="meal">current rate=${meal.rate}<div class="star-rating">
																					<div class="star-rating__wrap">
																						<input class="star-rating__input fa" id="star-rating-5" type="radio" name="rate" value="5" title="5 out of 5 stars"> 
																						<input class="star-rating__input fa" id="star-rating-4"	type="radio" name="rate" value="4" title="4 out of 5 stars">
																						<input class="star-rating__input fa" id="star-rating-3"	type="radio" name="rate" value="3" title="3 out of 5 stars"> 
																						<input class="star-rating__input fa" id="star-rating-2"	type="radio" name="rate" value="2" title="2 out of 5 stars"> 
																						<input class="star-rating__input fa" id="star-rating-1"	type="radio" name="rate" value="1" title="1 out of 5 stars">
																					</div>
																				</div>
																				<button>Ok</button>
																			</form:form>
                                                                        </div>
                                                                        <div class="weight_row">
                                                                            <div class="weight">${meal.weight} gr</div>
                                                                        </div>
                                                                        <div class="short_description">
                                                                            <p>${meal.shortDescription}</p>
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
                                                                            <a href="/login">
                                                                                <button type="button" class="btn-cart buy btnCafe btn-sucsess btn-lg">Order</button>
                                                                            </a>
                                                                        </sec:authorize>
                                                                        <sec:authorize access="isAuthenticated()">
                                                                            <a href="/place">
                                                                                <button type="button" class="btn-cart buy btnCafe btn-sucsess btn-lg">Order</button>
                                                                            </a>
                                                                        </sec:authorize>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </c:forEach>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="col-12 center">
                        <h2>Find us</h2> </div>
                    <div class="col-12 center">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29112.343557341348!2d23.992958218503922!3d49.83885086658292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add67a0879827%3A0xc68944e5293256f2!2sIT+Academy+Logos!5e0!3m2!1suk!2sua!4v1504697969891" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>
                    </div>
                    <!--map!-->
                    <div class="empty_footer" style="height: 326px;"></div>
                    <!--FOOTER!-->
                    <footer>
                        <div class="container">
                            <div class="col-12 center">
                                <div class="copyright">
                                    <p>&copy; 2017 Ostap Lozinskyj
                                        <br>All trademarks and registered trademarks appearing on this site are the property of their respective owners.</p>
                                </div>
                            </div>
                            <div class="col-6 center"> Made with support: </div>
                            <div class="col-6 center"> <img src="resources/img/logos.png" style="background: gray; height: 50px;"> </div>
                        </div>
                    </footer>
                    <!--FOOTER!-->
                    <a class="scroll-top" href="javascript:;" style="display: none;"></a>
                    <!--relations!-->
                    <script src="resources/js/9f1951474454579b5748d0ff2d3c5c9a38014687387.js"></script>                    
                </body>

                </html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<link rel="stylesheet" href="resources/css/rateStars.css" type="text/css"/>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>

<link href="/resources/css/index.css" rel="stylesheet">
<title>MealId</title>
</head>
<body style="background: url(/resources/img/fon2.jpg)">
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1 class="text-center">${meal.name}</h1>
			</div>
		</div>	
		<div class="row">
			<div class="col-2">
				<br>
				<a class="btn-cart buy btnCafe btn-sucsess btn-lg" href="/admin">Admin</a>
			</div>
			<div class="col-2">
				<br>
				<a class="btn-cart buy btnCafe btn-sucsess btn-lg" href="/">Main page</a>
			</div>
			<div class="col-2">
				<br>
				<a class="btn-cart buy btnCafe btn-sucsess btn-lg" href="/meal">Menu</a>
			</div>
		</div>
		<br>
		<div class="row">
			<div class="col-6">
				<img class="product-img" src="${meal.photoUrl}?version=${meal.version}" width="536" height="536">
			</div>
			<div class="col-6" style="background-color: white;">
				<div class="banner_info">
					<div class="back"></div>
					<div class="front">
						<div class="front_inside">
							<h1 class="center">${meal.name}</h1>
							<div class="weight_row">
								<div class="weight">${meal.weight}gr</div>
							</div>
							<div class="short_description">
								<p>${meal.fullDescription}</p>
							</div>
							<div class="price_row">
								<div class="price">
									<span class="price_value">${meal.price}</span> $
								</div>
							</div>
							<div class="buy_row">
								<sec:authorize access="isAnonymous()">
									<a href="/login">
										<button type="button"
											class="btn-cart buy btnCafe btn-sucsess btn-lg">Order</button>
									</a>
								</sec:authorize>
								<sec:authorize access="isAuthenticated()">
									<a href="/reserveTable">
										<button type="button"
											class="btn-cart buy btnCafe btn-sucsess btn-lg">Order</button>
									</a>
								</sec:authorize>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
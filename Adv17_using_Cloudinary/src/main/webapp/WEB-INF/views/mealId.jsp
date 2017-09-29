<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="custom" uri="/WEB-INF/tags/implicit.tld"%>
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
									<a href="/place">
										<button type="button"
											class="btn-cart buy btnCafe btn-sucsess btn-lg">Order</button>
									</a>
								</sec:authorize>
								
								<sec:authorize access="isAnonymous()">
									<a href="/login">
										<button type="button" class="btn-cart buy btnCafe btn-sucsess btn-lg">Add comment</button>
									</a>
								</sec:authorize>
								<sec:authorize access="isAuthenticated()">
									<a href="/meal/${meal.id}/comment">
										<button type="button" class="btn-cart buy btnCafe btn-sucsess btn-lg">Add comment</button>
									</a>
								</sec:authorize>
								<form:form action="/meal/${meal.id}/comment" method="GET" modelAttribute="comment">
									<custom:hiddenInputs excludeParams="text, _csrf"/>
									<br>
									<div class="row">
										<div class="col-10 ml-auto" style="color: red;">
											<form:errors path="text" />
										</div>
									</div>
									<div class="form-group row">
										<label class="col-2 col-form-label" for="text">Text:</label>
										<div class="col-10">
											<form:textarea class="form-control" id="text" rows="3" path="text"></form:textarea>
										</div>
									</div>
									<div class="form-group row">
										<div class="col-8 mr-auto">
											<button class="btn btn-sm btn-outline-success">Save</button>
											<a href="/admin/adminMeal/cancel<custom:allParams/>"
												class="btn btn-sm btn-outline-warning">Cancel</a>
										</div>
									</div>
								</form:form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
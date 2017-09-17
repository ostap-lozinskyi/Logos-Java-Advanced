<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
	integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M"
	crossorigin="anonymous">
<title>Registration</title>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1 class="text-center">Meal Photo Update</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="text-center">
				<div class="btn-group text-center" role="group" aria-label="Basic example">
					<a class="btn btn-outline-primary" href="/">Main Page</a>
					<a class="btn btn-outline-primary" href="/admin">Admin</a>
					<a class="btn btn-outline-primary" href="/userCabinet">Admin Cabinet</a>
					<a class="btn btn-outline-primary" href="/admin/ingredient">Ingredient</a>
					<a class="btn btn-outline-primary" href="/admin/ms">Ms</a>
					<a class="btn btn-outline-primary" href="/admin/component">Component</a>
					<a class="btn btn-outline-primary" href="/admin/cuisine">Cuisine</a>
					<a class="btn btn-outline-primary" href="/admin/meal">Meal</a>
					<a class="btn btn-outline-primary" href="/admin/mealPhotoUpdate">Meal Photo Updade</a>
					<a class="btn btn-outline-primary" href="/admin/order">Order</a>
					<a class="btn btn-outline-primary" href="/admin/place">Place</a>
				</div>
				</div>				
			</div>
		</div>
		<br>
		<div class="row">
			<div class="col-9">
				<table class="table table-bordered">
					<c:forEach var="meal" items="${meals.content}">
						<div class="row">
							<div class="col-2">${meal.name}</div>
							<div class="col-2">${meal.fullDescription}</div>
							<div class="col-2">${meal.price}</div>
							<div class="col-2 class=text-center">
								<img src="/img/${meal.photoUrl}?version=${meal.version}" style="width: 100px;">
							</div>
							<div class="col-2 class=text-center">								
							 	<form:form action="/admin/mealPhotoUpdate/${meal.id}" method="POST" modelAttribute="fileRequest" enctype="multipart/form-data">
									<input name="file" type="file">
									<br><button>Ok</button>
								</form:form>
							</div>
						</div>
					</c:forEach>
				</table>
			</div>			
		</div>
	</div>
</body>
</html>
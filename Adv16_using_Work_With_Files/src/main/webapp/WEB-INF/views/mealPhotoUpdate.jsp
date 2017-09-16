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
			<div class="col-9">
				<table class="table table-bordered">
					<tr>
						<th class="text-center">Name</th>
						<th class="text-center">Full Description</th>
						<th class="text-center">Price</th>
						<th class="text-center">Weight</th>
						<th class="text-center">Cuisine</th>
						<th class="text-center">Options</th>
					</tr>
					<c:forEach var="meal" items="${meals.content}">
						<div class="row">
							<div class="col-2">${meal.name}</div>
							<div class="col-2">${meal.fullDescription}</div>
							<div class="col-2">${meal.price}</div>
							<div class="col-2">${meal.weight}</div>
							<div class="col-2">${meal.cuisine.name}</div>
							<div class="col-2 class=text-center">
								<img src="/img/${meal.photoUrl}?version=${version}" style="height: 200px;">
							 	<form:form action="/admin/mealPhotoUpdate/${meal.id}" method="POST" modelAttribute="fileRequest" enctype="multipart/form-data">
									<input name="file" type="file">
									<br>
									<br><button>Ok</button>
								</form:form>
							</div>
						</div>
					</c:forEach>
				</table>
				<a href="/admin">to Admin</a>
			</div>			
		</div>
	</div>
</body>
</html>
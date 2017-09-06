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
<title>Meal</title>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1 class="text-center">Meal</h1>
				<form:form action="/admin/meal" method="POST" modelAttribute="meal">
					<div class="row">
						<div class="col-10 ml-auto" style="color: red;">
							<form:errors path="name" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-2 col-form-label" for="name">Name:</label>
						<div class="col-10">
							<form:input class="form-control" id="name" path="name"/>
						</div>
					</div>
					<div class="row">
						<div class="col-10 ml-auto" style="color: red;">
							<form:errors path="fullDescription" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-2 col-form-label" for="fullDescription">Full Description:</label>
						<div class="col-10">
							<form:input class="form-control" id="fullDescription" path="fullDescription"/>
						</div>
					</div>
					<div class="row">
						<div class="col-10 ml-auto" style="color: red;">
							<form:errors path="shortDescription" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-2 col-form-label" for="shortDescription">Short Description:</label>
						<div class="col-10">
							<form:input class="form-control" id="shortDescription" path="shortDescription"/>
						</div>
					</div>
					<div class="row">
						<div class="col-10 ml-auto" style="color: red;">
							<form:errors path="price" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-2 col-form-label" for="price">Price:</label>
						<div class="col-10">
							<form:input class="form-control" id="price" path="price"/>
						</div>
					</div>
					<div class="row">
						<div class="col-10 ml-auto" style="color: red;">
							<form:errors path="weight" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-2 col-form-label" for="weight">Weight:</label>
						<div class="col-10">
							<form:input class="form-control" id="weight" path="weight"/>
						</div>
					</div>
					<div class="form-group row">
						<label class="col-2 col-form-label" for="cuisine">Cuisine:</label>
						<div class="col-10">
							<form:select class="form-control" id="cuisine" path="cuisine" items="${cuisines}"/>
						</div>
					</div>
					<div class="form-group row">
						<label class="col-2 col-form-label" for="component">Components:</label>
						<div class="col-10">
							<form:select class="form-control" id="component" path="components" items="${components}" itemValue="id"/>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-8 mr-auto">
							<button class="btn btn-sm btn-outline-success">Save</button>
							<a href="/admin/meal/cancel" class="btn btn-sm btn-outline-warning">Cancel</a>
						</div>
					</div>
				</form:form>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<table class="table table-bordered">
					<tr>
						<th class="text-center">Name</th>
						<th class="text-center">Full Description</th>
						<th class="text-center">Price</th>
						<th class="text-center">Weight</th>
						<th class="text-center">Cuisine</th>
						<th class="text-center">Options</th>
					</tr>
					<c:forEach var="meal" items="${meals}">
						<tr>
							<td>${meal.name}</td>
							<td>${meal.fullDescription}</td>
							<td>${meal.price}</td>
							<td>${meal.weight}</td>
							<td>${meal.cuisine}</td>
							<td class="text-center"><a
								href="/admin/meal/update/${meal.id}"
								class="btn btn-outline-warning btn-sm">Update</a> <a
								href="/admin/meal/delete/${meal.id}"
								class="btn btn-outline-danger btn-sm">Delete</a></td>
						</tr>
					</c:forEach>
				</table>
				<a href="/admin">to Admin</a>
			</div>
		</div>
	</div>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="custom" uri="/WEB-INF/tags/implicit.tld"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
<title>Meal</title>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1 class="text-center">Meal</h1>
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
					<a class="btn btn-outline-primary" href="/admin/order">Order</a>
					<a class="btn btn-outline-primary" href="/admin/place">Place</a>
				</div>
				</div>				
			</div>
		</div>
		<br>
		<div class="row">
			<div class="col-2">
				<form:form action="/admin/meal" method="GET" modelAttribute="filter">
					<div class="form-group row">
						<div class="col-12">
							<form:input class="form-control" path="search" placeholder="Search"/>
						</div>
					</div>
				</form:form>
			</div>
			<div class="col-10">
				<form:form action="/admin/meal" method="POST" modelAttribute="meal">
					<custom:hiddenInputs excludeParams="name, fullDescription, shortDescription, price, weight, _csrf"/>
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
					<div class="row">
						<div class="col-10 ml-auto" style="color: red;">
							<form:errors path="cuisine" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-2 col-form-label" for="cuisine">Cuisine:</label>
						<div class="col-10">
							<form:select class="form-control" id="cuisine" path="cuisine" onchange="${cuisines}">
								<form:option value="" label="Select Cuisine" style="color: gray;"/>
								<form:options items="${cuisines}"/>
							</form:select>
						</div>
					</div>
					<div class="row">
						<div class="col-10 ml-auto" style="color: red;">
							<form:errors path="components" />
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
							<a href="/admin/meal/cancel<custom:allParams/>" class="btn btn-sm btn-outline-warning">Cancel</a>
						</div>
					</div>
				</form:form>
			</div>
		</div>
		<div class="row">				
			<div class="col-2 text-center">
				<button class="dropdown-toggle btn btn-outline-primary btn-sm" type="button" data-toggle="dropdown">Sort</button>
				<div class="dropdown-menu">
					<custom:sort innerHtml="Name asc" paramValue="name"/>
					<custom:sort innerHtml="Name desc" paramValue="name,desc"/>
				</div>
			</div>
			<div class="col-2 text-center">
				<custom:size posibleSizes="1,2,5,10" size="${meals.size}" />
			</div>			
		</div>
		<br>
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
						<th class="text-center">Options</th>
						<th class="text-center">Options</th>
					</tr>
					<c:forEach var="meal" items="${meals.content}">
						<tr>
							<td>${meal.name}</td>
							<td>${meal.fullDescription}</td>
							<td>${meal.price}</td>
							<td>${meal.weight}</td>
							<td>${meal.cuisine.name}</td>
							<td class="text-center"><a
								href="/admin/meal/update/${meal.id}<custom:allParams/>"	class="btn btn-outline-warning btn-sm">Update</a> <a
								href="/admin/meal/delete/${meal.id}<custom:allParams/>"	class="btn btn-outline-danger btn-sm">Delete</a>
							</td>
							<td class="text-center">
								<img src="${meal.photoUrl}?version=${meal.version}" style="width: 100px;">
							</td>
							<td class="text-center">
								<form:form action="/admin/meal/photoUpdate/${meal.id}" method="POST" modelAttribute="fileRequest" enctype="multipart/form-data">
									<input name="file" type="file">
									<br><button>Ok</button>
								</form:form>
							</td>
						</tr>
					</c:forEach>
				</table>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<custom:pageable page="${meals}"/>
			</div>
		</div>
	</div>
</body>
</html>
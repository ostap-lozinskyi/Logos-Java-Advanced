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

<link href="/resources/css/index.css" rel="stylesheet">
<title>Meal</title>
</head>
<body style="background: url(/resources/img/fon2.jpg)">
	<div class="container" style="background-color: white;">
		<div class="row">
			<div class="col-12">
				<h1 class="text-center">Meal</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="text-center">
				<div class="btn-group text-center" role="group" aria-label="Basic example">
					<a class="btn btn-outline-success" href="/">Main Page</a>
					<a class="btn btn-outline-success" href="/admin">Admin</a>
					<a class="btn btn-outline-success" href="/userCabinet">Admin Cabinet</a>
					<a class="btn btn-outline-success" href="/admin/ingredient">Ingredient</a>
					<a class="btn btn-outline-success" href="/admin/ms">Ms</a>
					<a class="btn btn-outline-success" href="/admin/component">Component</a>
					<a class="btn btn-outline-success" href="/admin/cuisine">Cuisine</a>
					<a class="btn btn-outline-success" href="/admin/meal">Meal</a>
					<a class="btn btn-outline-success" href="/admin/order">Order</a>
					<a class="btn btn-outline-success" href="/admin/place">Place</a>
				</div>
				</div>				
			</div>
		</div>
		<br>
		<div class="row">
			<div class="col-12">
				<form:form action="/admin/meal" method="POST" modelAttribute="meal" enctype="multipart/form-data">
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
						<label class="col-2 col-form-label" for="file">Photo:</label>
						<div class="col-10">
							<input name="file" type="file">
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
			<div class="col-12">
				<br>
				<p>
					<button class="btn-cart buy btnCafe btn-sucsess btn-lg" type="button"
						data-toggle="collapse" data-target="#firstCollapse"
						aria-expanded="false" aria-controls="firstCollapse">
						Search meal</button>
				</p>
				<div class="collapse" id="firstCollapse">
					<div class="card card-body">
						<form:form action="/admin/meal" method="GET" modelAttribute="mealFilter">
							<div class="form-group row">
								<div class="col-2">
									<form:input path="minRate" class="form-control" placeholder="Min rate"/>
								</div>
								<div class="col-2">
									<form:input path="maxRate" class="form-control" placeholder="Max rate"/>
								</div>
								<div class="col-2">
									<form:input path="minPrice" class="form-control" placeholder="Min price"/>
								</div>
								<div class="col-2">
									<form:input path="maxPrice" class="form-control" placeholder="Max price"/>
								</div>					
								<div class="col-2">
									<form:input path="minWeight" class="form-control" placeholder="Min weight"/>
								</div>
								<div class="col-2">
									<form:input path="maxWeight" class="form-control" placeholder="Max weight"/>
								</div>
							</div>
							<div class="form-group row">
								<div class="col-2">
									<form:input path="search" class="form-control" placeholder="By name"/>
								</div>						
								<div class="col-2">
									<p>								
										<button class="btn btn-outline-secondary" type="button"
											data-toggle="collapse" data-target="#secondCollapse"
											aria-expanded="false" aria-controls="secondCollapse">
											Select cuisine</button>
									</p>
									<div class="collapse" id="secondCollapse">
										<div class="card card-body">
											<form:checkboxes items="${cuisines}" path="cuisineName" element="div"/>
										</div>
									</div>
								</div>						
								<div class="col-12">
		        					<button type="submit" class="btn-cart buy btnCafe btn-sucsess btn-lg">Search</button>
		      					</div>
							</div>
						</form:form>
					</div>
				</div>
			</div>
		</div>
		<br>
		<div class="row">			
			<div class="col-2 text-center">
				<button class="dropdown-toggle btn btn-outline-success btn-sm" type="button" data-toggle="dropdown">Sort</button>
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
						<th class="text-center">Photo</th>
					</tr>
					<c:forEach var="meal" items="${meals.content}">
						<tr>
							<td>${meal.name}</td>
							<td>${meal.fullDescription}</td>
							<td>${meal.price}</td>
							<td>${meal.weight}</td>
							<td>${meal.cuisine}</td>
							<td class="text-center">
								<a href="/admin/meal/update/${meal.id}<custom:allParams/>"	class="btn btn-outline-warning btn-sm">Update</a>
								<a href="/admin/meal/delete/${meal.id}<custom:allParams/>"	class="btn btn-outline-danger btn-sm">Delete</a>
							</td>
							<td class="text-center">
								<img src="${meal.photoUrl}?version=${meal.version}" style="width: 100px;">
							</td>
<!-- 							<td> -->
<%-- 								<form:form action="/admin/meal/photoUpdate/${meal.id}" method="POST" modelAttribute="fileRequest" enctype="multipart/form-data"> --%>
<!-- 									<input name="file" type="file"> -->
<!-- 									<button>Ok</button> -->
<%-- 								</form:form> --%>
<!-- 							</td> -->
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
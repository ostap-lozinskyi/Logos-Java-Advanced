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
<title>Order</title>
</head>
<body style="background: url(/resources/img/fon2.jpg)">
	<div class="container" class="container" style="background-color: white;">
		<div class="row">
			<div class="col-12">
				<h1 class="text-center">Order</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="text-center">
				<div class="btn-group text-center" role="group" aria-label="Basic example">
					<a class="btn btn-outline-success" href="/">Main Page</a>
					<a class="btn btn-outline-success" href="/admin">Admin</a>
					<a class="btn btn-outline-success" href="/userCabinet">Admin Cabinet</a>
					<a class="btn btn-outline-success" href="/admin/adminIngredient">Ingredient</a>
					<a class="btn btn-outline-success" href="/admin/adminMs">Ms</a>
					<a class="btn btn-outline-success" href="/admin/adminComponent">Component</a>
					<a class="btn btn-outline-success" href="/admin/adminCuisine">Cuisine</a>
					<a class="btn btn-outline-success" href="/admin/adminMeal">Meal</a>
					<a class="btn btn-outline-success" href="/admin/adminOrder">Order</a>
					<a class="btn btn-outline-success" href="/admin/adminPlace">Place</a>
				</div>
				</div>				
			</div>
		</div>
		<br>
		<div class="row">
			<div class="col-12">
				<form:form action="/admin/adminOrder" method="POST" modelAttribute="order">
					<div class="row">
						<div class="col-10 ml-auto" style="color: red;">
							<form:errors path="meals" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-2 col-form-label" for="meal">Meals:</label>
						<div class="col-10">
							<form:select class="form-control" id="meal" path="meals" items="${meals}"/>
						</div>
					</div>
					<div class="row">
						<div class="col-10 ml-auto" style="color: red;">
							<form:errors path="place" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-2 col-form-label" for="place">Place:</label>
						<div class="col-10">
							<form:select class="form-control" id="place" path="place" onchange="${places}">
								<form:option value="" label="Select Place" style="color: gray;"/>
 								<form:options items="${places}" itemLabel="print" itemValue="id"/>
							</form:select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-8 mr-auto">
							<button class="btn btn-sm btn-outline-success">Save</button>
							<a href="/admin/adminOrder/cancel<custom:allParams/>" class="btn btn-sm btn-outline-warning">Cancel</a>
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
						Search order</button>
				</p>
				<div class="collapse" id="firstCollapse">
					<div class="card card-body">
						<form:form action="/admin/adminOrder" method="GET" modelAttribute="orderFilter">
							<div class="form-group row">
								<div class="col-2">
									<p>								
										<button class="btn btn-outline-secondary" type="button"
											data-toggle="collapse" data-target="#secondCollapse"
											aria-expanded="false" aria-controls="secondCollapse">
											Select place</button>
									</p>
									<div class="collapse" id="secondCollapse">
										<div class="card card-body">
											<c:forEach var="place" items="${places}">
												<div class="row">
													<div class="col-12">
															<form:checkbox path="placeNumber" value="${place.number}"/> ${place.number} (${place.countOfPeople} people)							
													</div>
												</div>
											</c:forEach>
										</div>
									</div>
									<br>
								</div>	
								<div class="col-2">
									<p>								
										<button class="btn btn-outline-secondary" type="button"
											data-toggle="collapse" data-target="#thirdCollapse"
											aria-expanded="false" aria-controls="thirdCollapse">
											Select meal</button>
									</p>
									<div class="collapse" id="thirdCollapse">
										<div class="card card-body">
											<form:checkboxes items="${meals}" path="mealName" element="div"/>
										</div>
									</div>
									<br>
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
			<div class="col-9">
				<table class="table table-bordered">
					<tr>
						<th class="text-center">Id</th>
						<th class="text-center">Place</th>
						<th class="text-center">Options</th>
					</tr>
					<c:if test="${empty orders.content}">
		    			<tr>
		    			<td colspan=3><h3 class="text-center">Orders with such parameters not found</h3></td>
		    			</tr>
					</c:if>
					<c:forEach var="order" items="${orders.content}">
						<tr>
							<td>${order.id}</td>
							<td>${order.place}</td>
							<td class="text-center">
								<a	href="/admin/adminOrder/update/${order.id}<custom:allParams/>" class="btn btn-outline-warning btn-sm">Update</a>
								<a	href="/admin/adminOrder/delete/${order.id}<custom:allParams/>" class="btn btn-outline-danger btn-sm">Delete</a>
							</td>
						</tr>
					</c:forEach>
				</table>
			</div>
			<div class="col-3">
				<div class="row">
					<div class="col-6 text-center">
							<button class="dropdown-toggle btn btn-outline-success btn-sm" type="button" data-toggle="dropdown">Sort
							</button>
							<div class="dropdown-menu">
								<custom:sort innerHtml="Place asc" paramValue="place"/>
								<custom:sort innerHtml="Place desc" paramValue="place,desc"/>
							</div>
					</div>
					<div class="col-6 text-center">
						<custom:size posibleSizes="1,2,5,10" size="${orders.size}" />
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<custom:pageable page="${orders}"/>
			</div>
		</div>
	</div>
</body>
</html>
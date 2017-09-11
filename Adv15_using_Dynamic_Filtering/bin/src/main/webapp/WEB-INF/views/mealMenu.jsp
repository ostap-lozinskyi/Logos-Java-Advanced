<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
<title>Cafe</title>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1 class="text-center">Menu</h1>
				<form:form action="/mealMenu" method="GET" modelAttribute="mealFilter">
					<div class="form-group row">
						<div class="col-12">
							<form:input path="search" class="form-control" placeholder="Search"/>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-6">
							<form:input path="minRate" class="form-control" placeholder="Min rate"/>
						</div>
						<div class="col-6">
							<form:input path="maxRate" class="form-control" placeholder="Max rate"/>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-6">
							<form:input path="minPrice" class="form-control" placeholder="Min price"/>
						</div>
						<div class="col-6">
							<form:input path="maxPrice" class="form-control" placeholder="Max price"/>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-6">
							<form:input path="minWeight" class="form-control" placeholder="Min weight"/>
						</div>
						<div class="col-6">
							<form:input path="maxWeight" class="form-control" placeholder="Max weight"/>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-12">
							<form:checkboxes items="${cuisines}" path="cuisinesIds" element="div" />
						</div>
					</div>
					<div class="form-group row">
						<div class="col-12">
        					<button type="submit" class="btn btn-outline-success btn-sm">Search</button>
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
						<th class="text-center">Price</th>
						<th class="text-center">Short Description</th>
						<th class="text-center">Weight</th>
						<th class="text-center">Options</th>
					</tr>
					<c:forEach var="meal" items="${meals.content}">
						<tr>
							<td>${meal.name}</td>
							<td>${meal.price}</td>
							<td>${meal.shortDescription}</td>
							<td>${meal.weight}</td>
							<td class="text-center"><a
								href=""
								class="btn btn-outline-success btn-sm">Order</a> 
							</td>
						</tr>
					</c:forEach>
				</table>
				<a href="/admin">to Admin</a>
				<br><a href="/">to Main page</a>
			</div>
		</div>
	</div>
</body>
</html>
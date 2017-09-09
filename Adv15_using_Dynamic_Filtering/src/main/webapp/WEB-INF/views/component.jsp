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
<title>Component</title>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1 class="text-center">Component</h1>
				<form:form action="/admin/component" method="POST" modelAttribute="component">
					<div class="row">
						<div class="col-10 ml-auto" style="color: red;">
							<form:errors path="${componentRequest}" />
						</div>
					</div>
					<div class="row">
						<div class="col-10 ml-auto" style="color: red;">
							<form:errors path="amount" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-2 col-form-label" for="amount">Amount:</label>
						<div class="col-10">
							<form:input class="form-control" id="amount" path="amount"/>
						</div>
					</div>
					<div class="row">
						<div class="col-10 ml-auto" style="color: red;">
							<form:errors path="ms" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-2 col-form-label" for="ms">Measuring system:</label>
						<div class="col-10">
							<form:select class="form-control" id="ms" path="ms" onchange="${ms}">
								<form:option value="" label="Select Measuring system" style="color: gray;"/>
								<form:options items="${mss}"/>
							</form:select>
						</div>
					</div>
					<div class="row">
						<div class="col-10 ml-auto" style="color: red;">
							<form:errors path="ingredient" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-2 col-form-label" for="ingredient">Ingredient:</label>
						<div class="col-10">
							<form:select class="form-control" id="ingredient" path="ingredient" onchange="${ingredients}">
								<form:option value="" label="Select Ingredient" style="color: gray;"/>
								<form:options items="${ingredients}"/>
							</form:select>
						</div>
					</div>
					<div class="form-group row">
						<div class="col-8 mr-auto">
							<button class="btn btn-sm btn-outline-success">Save</button>
							<a href="/admin/component/cancel<custom:allParams/>" class="btn btn-sm btn-outline-warning">Cancel</a>
						</div>
					</div>
				</form:form>
			</div>
		</div>
		<div class="row">
			<div class="col-9">
				<table class="table table-bordered">
					<tr>
						<th class="text-center">Amount</th>
						<th class="text-center">Measuring system</th>
						<th class="text-center">Ingredient</th>
						<th class="text-center">Options</th>
					</tr>
					<c:forEach var="component" items="${components.content}">
						<tr>
							<td>${component.amount}</td>
							<td>${component.ms.name}</td>
							<td>${component.ingredient.name}</td>
							<td class="text-center">
								<a href="/admin/component/update/${component.id}<custom:allParams/>" class="btn btn-outline-warning btn-sm">Update</a>
								<a href="/admin/component/delete/${component.id}<custom:allParams/>" class="btn btn-outline-danger btn-sm">Delete</a>
							</td>
						</tr>
					</c:forEach>
				</table>
				<a href="/admin">to Admin</a>
			</div>
			<div class="col-3">
				<div class="row">
					<div class="col-6 text-center">
							<button class="dropdown-toggle btn btn-outline-primary btn-sm" type="button" data-toggle="dropdown">Sort
							</button>
							<div class="dropdown-menu">
								<custom:sort innerHtml="Name asc" paramValue="name"/>
								<custom:sort innerHtml="Name desc" paramValue="name,desc"/>
							</div>
					</div>
					<div class="col-6 text-center">
						<custom:size posibleSizes="1,2,5,10" size="${components.size}" />
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<custom:pageable page="${components}"/>
			</div>
		</div>
	</div>
</body>
</html>
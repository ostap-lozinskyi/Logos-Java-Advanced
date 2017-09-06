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
<title>Order</title>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1 class="text-center">Order</h1>
				<form:form action="/admin/order" method="POST" modelAttribute="order">
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
					<div class="form-group row">
						<label class="col-2 col-form-label" for="place">Place:</label>
						<div class="col-10">
							<form:select class="form-control" id="place" path="place" items="${places}" itemLabel="print" itemValue="id"/>
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
						<th class="text-center">Number</th>
						<th class="text-center">Place</th>
						<th class="text-center">Options</th>
					</tr>
					<c:forEach var="order" items="${orders}">
						<tr>
							<td>${order.id}</td>
							<td>${order.place}</td>
							<td class="text-center">
								<a	href="/admin/order/update/${order.id}" class="btn btn-outline-warning btn-sm">Update</a>
								<a	href="/admin/order/delete/${order.id}" class="btn btn-outline-danger btn-sm">Delete</a>
							</td>
						</tr>
					</c:forEach>
				</table>
				<a href="/admin">Admin</a>
			</div>
		</div>
	</div>
</body>
</html>
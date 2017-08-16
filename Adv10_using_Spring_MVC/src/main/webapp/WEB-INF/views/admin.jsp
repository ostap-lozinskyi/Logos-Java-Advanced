<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
	integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M"
	crossorigin="anonymous">
<title>Admin</title>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1 class="text-center">Admin</h1>
				<div class="text-center">
				<div class="btn-group text-center" role="group" aria-label="Basic example">
					<a class="btn btn-outline-primary" href="/admin/ingredient">Ingredient</a>
					<a class="btn btn-outline-primary" href="/admin/cuisine">Cuisine</a>
					<a class="btn btn-outline-primary" href="/admin/meal">Meal</a>
					<a class="btn btn-outline-primary" href="/admin/ms">Ms</a>
					<a class="btn btn-outline-primary" href="/admin/order">Order</a>
					<a class="btn btn-outline-primary" href="/admin/place">Place</a>
				</div>
				</div>
				<div class="row">
					<a href="/">to Main Page</a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
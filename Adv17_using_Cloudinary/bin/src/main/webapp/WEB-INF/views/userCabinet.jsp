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
				<h1 class="text-center">User Cabinet</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-4">
				<img src="/img/${user}?version=${version}" style="height: 200px;">
			</div>
			<div class="col-8">								
				<form:form action="/userCabinet" method="POST" modelAttribute="fileRequest" enctype="multipart/form-data">
					<input name="file" type="file">
					<br>
					<br><button>Ok</button>
				</form:form>
			</div>
			<a href="/">to Main page</a>
		</div>
	</div>
</body>
</html>
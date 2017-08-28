<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
	integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M"
	crossorigin="anonymous">
<link rel="stylesheet" href="index.css">
<title>Cafe</title>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-11">
				<h1 class="text-center">${message}</h1>
			</div>
			<div class="col-1">
				<sec:authorize access="hasRole('ROLE_ADMIN')">
					<a href="/admin">Admin</a>
				</sec:authorize>
				<sec:authorize access="isAnonymous()">
		<a href="/registration">Registration</a>
		<a href="/login">Login</a>
	</sec:authorize>
	<sec:authorize access="isAuthenticated()">
		<form:form action="/logout">
			<button>Logout</button>
		</form:form>
	</sec:authorize>
			</div>
		</div>
	</div>
</body>
</html>
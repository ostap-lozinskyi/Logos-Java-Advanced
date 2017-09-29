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
	
<link href="/resources/css/index.css" rel="stylesheet">
<title>Cabinet</title>
</head>
<body style="background: url(/resources/img/fon2.jpg)">
	<div class="container" style="background-color: white;">
		<div class="row">
			<div class="col-12">
				<h1 class="text-center">User Cabinet</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-2 col-sm-4">
				<br>
				<a class="btn-cart buy btnCafe btn-sucsess btn-lg" href="/">Main page</a>
			</div>
			<div class="col-lg-2 col-sm-4">
				<br>
				<a class="btn-cart buy btnCafe btn-sucsess btn-lg" href="/meal">Menu</a>
			</div>
			<div class="col-lg-2 col-sm-4">
				<br>
				<a class="btn-cart buy btnCafe btn-sucsess btn-lg" href="/place">Tables</a>
			</div>
		</div>
		<br>
		<div class="row">
			<div class="col-4">
				<img src="${user.photoUrl}?version=${user.version}" style="height: 200px;">
			</div>
		</div>
		<div class="row">
			<div class="col-8">	
				<br>							
				<form:form action="/userCabinet" method="POST" modelAttribute="fileRequest" enctype="multipart/form-data">
					<input name="file" type="file">
					<br>
					<br><button>Ok</button>
				</form:form>
			</div>
		</div>
		<br>
	</div>
</body>
</html>
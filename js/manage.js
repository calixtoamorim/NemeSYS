$(document).ready(function(){
	var DOMAIN = "http://localhost/projetoinv";

	//Mange Category
	manageCategory(1);
	function manageCategory(pn){
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			data : {manageCategory:1,pageno:pn},
			success : function(data){
				$("#get_category").html(data);		
			}
		})
	}

	$("body").delegate(".page-link","click",function(){
		var pn = $(this).attr("pn");
		manageCategory(pn);
	})

	$("body").delegate(".del_cat","click",function(){
		var did = $(this).attr("did");
		if (confirm("Deseja excluir?")) {
			$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data : {deleteCategory:1,id:did},
				success : function(data){
					if (data == "DEPENDENT_CATEGORY") {
						alert("Esta categoria é dependente de outras sub-categorias");
					}else if(data == "CATEGORY_DELETED"){
						alert("Categoria excluída com sucesso");
						manageCategory(1);
					}else if(data == "DELETED"){
						alert("Excluído com Sucesso");
					}else{
						alert(data);
					}
						
				}
			})
		}else{

		}
	})

	//Fetch category
	fetch_category();
	function fetch_category(){
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			data : {getCategory:1},
			success : function(data){
				var root = "<option value='0'>Raiz</option>";
				var choose = "<option value=''>Escolha a categoria</option>";
				$("#parent_cat").html(root+data);
				$("#select_cat").html(choose+data);
			}
		})
	}

	//Fetch Brand
	fetch_brand();
	function fetch_brand(){
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			data : {getBrand:1},
			success : function(data){
				var choose = "<option value=''>Escolha a marca</option>";
				$("#select_brand").html(choose+data);
			}
		})
	}


	//Update Category
	$("body").delegate(".edit_cat","click",function(){
		var eid = $(this).attr("eid");
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			dataType : "json",
			data : {updateCategory:1,id:eid},
			success : function(data){
				console.log(data);
				$("#cid").val(data["cid"]);
				$("#update_category").val(data["category_name"]);
				$("#parent_cat").val(data["parent_cat"]);
			}
		})
	})

	$("#update_category_form").on("submit",function(){
		if ($("#update_category").val() == "") {
			$("#update_category").addClass("border-danger");
			$("#cat_error").html("<span class='text-danger'>Insira o nome da categoria</span>");
		}else{
			$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data  : $("#update_category_form").serialize(),
				success : function(data){
					window.location.href = "";
				}
			})
		}
	})


	//----------Brand-------------
	manageBrand(1);
	function manageBrand(pn){
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			data : {manageBrand:1,pageno:pn},
			success : function(data){
				$("#get_brand").html(data);		
			}
		})
	}

	$("body").delegate(".page-link","click",function(){
		var pn = $(this).attr("pn");
		manageBrand(pn);
	})

	$("body").delegate(".del_brand","click",function(){
		var did = $(this).attr("did");
		if (confirm("Deseja excluir ?")) {
			$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data : {deleteBrand:1,id:did},
				success : function(data){
					if (data == "DELETED") {
						alert("Marca excluída");
						manageBrand(1);
					}else{
						alert(data);
					}
						
				}
			})
		}
	})

	//Update Brand
	$("body").delegate(".edit_brand","click",function(){
		var eid = $(this).attr("eid");
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			dataType : "json",
			data : {updateBrand:1,id:eid},
			success : function(data){
				console.log(data);
				$("#bid").val(data["bid"]);
				$("#update_brand").val(data["brand_name"]);
			}
		})
	})

	$("#update_brand_form").on("submit",function(){
		if ($("#update_brand").val() == "") {
			$("#update_brand").addClass("border-danger");
			$("#brand_error").html("<span class='text-danger'>Insira a marca</span>");
		}else{
			$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data  : $("#update_brand_form").serialize(),
				success : function(data){
					alert(data);
					window.location.href = "";
				}
			})
		}
	})


	//---------------------Products-----------------
	manageProduct(1);
	function manageProduct(pn){
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			data : {manageProduct:1,pageno:pn},
			success : function(data){
				$("#get_product").html(data);		
			}
		})
	}

	$("body").delegate(".page-link","click",function(){
		var pn = $(this).attr("pn");
		manageProduct(pn);
	})

	$("body").delegate(".del_product","click",function(){
		var did = $(this).attr("did");
		if (confirm("Deseja excluir ?")) {
			$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data : {deleteProduct:1,id:did},
				success : function(data){
					if (data == "DELETED") {
						alert("Produto excluído");
						manageProduct(1);
					}else{
						alert(data);
					}
						
				}
			})
		}
	})

	//Update product
	$("body").delegate(".edit_product","click",function(){
		var eid = $(this).attr("eid");
		$.ajax({
			url : DOMAIN+"/includes/process.php",
			method : "POST",
			dataType : "json",
			data : {updateProduct:1,id:eid},
			success : function(data){
				console.log(data);
				$("#pid").val(data["pid"]);
				$("#update_product").val(data["product_name"]);
				$("#select_cat").val(data["cid"]);
				$("#select_brand").val(data["bid"]);
				$("#product_price").val(data["product_price"]);
				$("#product_qty").val(data["product_stock"]);

			}
		})
	})

	//Update product
	$("#update_product_form").on("submit",function(){
		$.ajax({
				url : DOMAIN+"/includes/process.php",
				method : "POST",
				data : $("#update_product_form").serialize(),
				success : function(data){
					if (data == "UPDATED") {
						alert("Produto atualizado com sucesso");
						window.location.href = "";
					}else{
						alert(data);
					}
				}
			})
	})


	
})
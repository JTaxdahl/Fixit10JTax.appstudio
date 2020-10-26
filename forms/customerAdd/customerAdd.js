req = ""
query = ""
results = ""

btnAddCustomer.onclick = function() {
  query = "INSERT INTO customer VALUES ('17','Jesse Antiques','1113 F St','Omaha','NE','68178')"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jat82519&pass=" + pw + "&database=jat82519&query=" + query)

  if (req.status == 200) { 
    if (req.responseText == 500) { 
      console.log("You have successfully added the Customer!")
    } else
      console.log("There was a problem with adding the Customer to the database.")
  } else {
    console.log("Error: " + req.status);
  }

  query = `SELECT name from customer ORDER BY customer_id DESC`
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jat82519&pass=" + pw + "&database=jat82519&query=" + query)

  if (req.status == 200) { 
    results = JSON.parse(req.responseText)
  } else {
    console.log(`Error: ${req.status}`);
  }
  let customersAdd = ""
  for (i = 0; i <= results.length - 1; i++)
    customersAdd = customersAdd + results[i] + "\n"
  txtAdd.value = customersAdd
}
btnNextPage2.onclick=function(){
  ChangeForm(customerUpdate)
}




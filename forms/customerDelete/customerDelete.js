req = ""
query = ""
results = ""

customerDelete.onshow = function() {
  drpDelete.clear()
  query = "SELECT name from customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jat82519&pass=" + pw + "&database=jat82519&query=" + query)

  if (req.status == 200) { 
    customerDeleteR = JSON.parse(req.responseText)
    console.log(customerDeleteR)
  }
  if (customerDeleteR.length == 0) {
    NSB.MsgBox("There are no customers to delete.")
  } else {
    for (i = 0; i <= customerDeleteR.length - 1; i++)
      drpDelete.addItem(customerDeleteR[i])
  }
}

drpDelete.onclick = function(s) {
  if (typeof(s) == "object")
    return
  else {
    drpDelete.value = s 
    let DeleteName = s
    let found = false
    for (i = 0; i <= customerDeleteR.length - 1; i++) {
      if (DeleteName == customerDeleteR[i]) {
        found = true;
        break;
      }
    }
    if (found == false)
     txtDelete.value = `That customer is not in the database.${DeleteName} \n ${customerDeleteR}`
    else if (found == true) {
      query = "DELETE FROM customer WHERE name = " + '"' + DeleteName + '"'
      req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jat82519&pass=" + pw + "&database=jat82519&query=" + query)
      
      if (req.status == 200) {
        if (req.responseText == 500) 
          console.log(`You have successfully deleted the customer named ${DeleteName}`)
        else
          console.log(`There was a problem deleting ${DeleteName} from the database.`)
      } else {
        console.log(`Error: ${req.status}`);
      }
    }
    query = `SELECT name from customer`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jat82519&pass=" + pw + "&database=jat82519&query=" + query)

    if (req.status == 200) {
      customerAfterDelete = JSON.parse(req.responseText)
    } else {
      console.log(`Error: ${req.status}`);
    }
    let customersLeft = ""
    for (i = 0; i <= customerAfterDelete.length - 1; i++)
      customersLeft = customersLeft + customerAfterDelete[i] + "\n"
    txtDelete.value = customersLeft
  }
}
btnNextPage1.onclick=function(){
  ChangeForm(customerAdd)
}



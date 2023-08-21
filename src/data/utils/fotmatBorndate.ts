export function formatBorndate(borndate) {
    if (borndate) {
      borndate = borndate.toString();
      borndate = borndate.replace(/[^*\d]/g, ""); // Remove tudo o que não é dígito exceto o asterisco
      
      borndate = borndate.replace(/(\d)(\d{2})(\d{4})$/, "$1/$2/$3"); // Coloca hífen entre o quarto e o quinto dígitos
    } 
    return borndate;
  }
  
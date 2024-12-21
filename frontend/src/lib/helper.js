export const formatTime=(time)=>{
    const date = new Date(time)

    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth()+1).padStart(2,'0')
    const year = date.getFullYear()

    let hours = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2,'0')
    const ampm = hours > 12 ? 'PM' : 'AM'
    hours = hours%12 || 12
    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`
}

export const formatInputDateTime=(time)=>{
    const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
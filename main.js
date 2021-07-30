const textBox = document.getElementById('input-text')
const button = document.getElementById('search')

button.addEventListener('click', () => {
    const container = document.getElementById('card-container')
    container.innerHTML = ""
    const search = textBox.value 
    const xhr = new XMLHttpRequest ()
    const url = `https://www.googleapis.com/books/v1/volumes?q=${search}`
    xhr.open('GET', url)
    xhr.onreadystatechange = () => {
        if(xhr.readyState==4 && xhr.status==200)
        {
            const userData = JSON.parse(xhr.responseText)
            console.log(userData)

            for(let i=0; i<userData.items.length; i++) {

                const title = document.createElement('h3')
                const image = document.createElement('img')
                const author = document.createElement('p')
                const publisher = document.createElement('p')
                var a = document.createElement('a')


                image.setAttribute('src', userData.items[i].volumeInfo.imageLinks.smallThumbnail)
                title.innerHTML = userData.items[i].volumeInfo.title;

                if(userData.items[i].volumeInfo.authors === undefined){
                    author.innerHTML = "Author: Info not available"
                } else {
                    author.innerHTML = 'Author: ' + userData.items[i].volumeInfo.authors;
                }
                
                if(userData.items[i].volumeInfo.publisher === undefined){
                    publisher.innerHTML = "Publisher: Info not available"
                } else {
                    publisher.innerHTML = 'Publisher: ' + userData.items[i].volumeInfo.publisher;
                }

                a.href = userData.items[i].volumeInfo.previewLink;
                a.textContent = "Read More"
                a.target = "_blank"
                a.className = "read-more-button"

                // const container = document.getElementById('card-container')
            
                const book_item = document.createElement('div')
                book_item.setAttribute("class", "book-item-list")

                container.appendChild(book_item)

                const container_left = document.createElement('div')
                const container_right = document.createElement('div')
                container_left.setAttribute("class", "image-content")
                container_right.setAttribute("class", "info-content")
                book_item.appendChild(container_left)
                book_item.appendChild(container_right)

                container_left.appendChild(image)
                container_right.appendChild(title)
                container_right.appendChild(author)
                container_right.appendChild(publisher)
                container_right.appendChild(a)
            }
        }
    }
    xhr.send()
})






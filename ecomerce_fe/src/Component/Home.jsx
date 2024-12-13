
const Home = () => {
  const categories = ["Electronics", "Clothing", "Books", "Home & Kitchen"];

  return (
    <div>

    <section className="category-list">
      <h3>Shop by Categories</h3>
      <div className="categories">
        {categories.map((category, index) => (
          <div className="category" key={index}>
            <h4>{category}</h4>
            {/* <button>Shop Now</button> */}
          </div>
        ))}
      </div>
    </section>


    </div>
  )
}

export default Home

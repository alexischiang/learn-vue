import "../assets/styles/footer.styl";

export default {
  data() {
    return {
      author: "Alex"
    };
  },
  render() {
    return (
      <footer id="footer">
        <span>Written by {this.author}</span>
      </footer>
    );
  }
};

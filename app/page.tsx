export default function Home() {


  return (
    <main className="items-center p-24">
        <form>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                message</label>
            <textarea id="message" rows={4}
                      className="textarea-primary"
                      placeholder="Write your thoughts here..."></textarea>
            <button className="btn-primary">Send</button>
        </form>
    </main>
  )
}

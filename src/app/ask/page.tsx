import { MessageSquare } from "lucide-react"
import Chat from "../../components/Chat"

export default function Ask() {
  return (
    <main>
      <section className="bg-gradient-to-b from-white to-green-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl font-bold mb-6 animate-fade-in">Ask Our Nutritionist AI</h1>
          <p className="text-lg text-textLight max-w-3xl mx-auto animate-slide-up">
            Get personalized nutrition advice instantly. Ask about meal plans, dietary restrictions, nutritional values,
            or any health-related questions.
          </p>
        </div>
      </section>

      <section className="section-container pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <MessageSquare className="h-6 w-6 text-accent" />
                </div>
                <h2 className="text-xl font-semibold">Nutrition Assistant</h2>
              </div>
            </div>
            <Chat />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Example Questions</h3>
              <ul className="space-y-2 text-sm text-textLight">
                <li>"What foods are high in protein but low in fat?"</li>
                <li>"How can I increase my iron intake?"</li>
                <li>"What's a good meal plan for weight loss?"</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Dietary Restrictions</h3>
              <ul className="space-y-2 text-sm text-textLight">
                <li>"What can I eat on a gluten-free diet?"</li>
                <li>"Suggest vegan protein sources."</li>
                <li>"Keto-friendly snack ideas?"</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-2">Health Conditions</h3>
              <ul className="space-y-2 text-sm text-textLight">
                <li>"Foods to avoid with high blood pressure?"</li>
                <li>"What should I eat to manage diabetes?"</li>
                <li>"Anti-inflammatory diet recommendations?"</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

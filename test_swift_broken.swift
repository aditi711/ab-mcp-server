import UIKit
import Foundation

// Bad naming convention - should be PascalCase
class userManager {
    // Force unwrapping issues
    var user: User!
    var data: [String: Any]!
    
    // Retain cycle - strong reference to self
    var completion: (() -> Void)?
    
    init() {
        completion = {
            self.processData() // Strong reference cycle
        }
    }
    
    // Poor method naming
    func getData() -> String? {
        // Force unwrapping without checking
        return user.name!
    }
    
    // Threading issue - UI update on background thread
    func updateUI() {
        DispatchQueue.global().async {
            // This is wrong - should be on main queue
            self.view.backgroundColor = UIColor.red
        }
    }
    
    // Magic numbers
    func calculateSize() -> CGFloat {
        return 42.0 * 3.14159 // Magic numbers everywhere
    }
    
    // Inefficient array operations
    func processItems(_ items: [String]) {
        for i in 0..<items.count {
            let item = items[i] // Should use for-in loop
            print(item.uppercased())
        }
    }
    
    // Poor error handling
    func loadData() {
        let url = URL(string: "https://api.example.com")!
        let data = try! Data(contentsOf: url) // Force try is dangerous
        let json = try! JSONSerialization.jsonObject(with: data)
    }
    
    // Memory leak potential
    func createTimer() {
        Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { _ in
            self.updateCounter() // Strong reference to self
        }
    }
    
    // Unused variables
    func unusedVariables() {
        let unused = "This variable is never used"
        let alsoUnused = 42
        print("Hello")
    }
    
    // Poor SwiftUI practices
    struct ContentView: View {
        @State var counter = 0
        
        var body: some View {
            VStack {
                // Should extract to computed property or method
                Text("Count: \(counter)")
                    .font(.title)
                    .foregroundColor(.blue)
                    .padding()
                    .background(Color.gray)
                    .cornerRadius(8)
                    .shadow(radius: 2)
                
                Button("Increment") {
                    counter += 1
                    // Expensive operation in view update
                    for i in 0..<1000000 {
                        _ = i * i
                    }
                }
            }
        }
    }
    
    // SOLID principle violations
    class BadUserService {
        func saveUser(_ user: User) {
            // Violates Single Responsibility - doing too much
            validateUser(user)
            hashPassword(user.password!)
            saveToDatabase(user)
            sendEmail(user.email!)
            logActivity("User saved")
            updateCache(user)
        }
        
        // All these should be separate responsibilities
        func validateUser(_ user: User) { /* validation logic */ }
        func hashPassword(_ password: String) { /* hashing logic */ }
        func saveToDatabase(_ user: User) { /* database logic */ }
        func sendEmail(_ email: String) { /* email logic */ }
        func logActivity(_ message: String) { /* logging logic */ }
        func updateCache(_ user: User) { /* caching logic */ }
    }
}

// Missing documentation
struct User {
    var name: String?
    var email: String?
    var password: String?
    var age: Int?
}

// Global variables (bad practice)
var globalCounter = 0
var globalData: [String] = [] 
import android.content.Context
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.*

// Bad naming convention - should be PascalCase
class userRepository {
    
    // Not using lateinit or nullable properly
    var context: Context = null!!
    var database: Any = null!!
    
    // No null safety
    fun getUser(id: String): User {
        val userData = fetchUserFromApi(id)!! // Force unwrapping
        return User(userData.name!!, userData.email!!)
    }
    
    // Poor error handling
    fun loadData(): String {
        return try {
            // This could throw exception
            readFileContent("/path/to/file")
        } catch (e: Exception) {
            "" // Swallowing exceptions
        }
    }
    
    // Memory leak - storing context reference
    companion object {
        var staticContext: Context? = null
    }
}

// Violating Single Responsibility Principle
class UserManager(private val context: Context) {
    
    // Too many responsibilities in one class
    fun processUser(user: User) {
        // Validation
        if (user.name == null || user.name!!.isEmpty()) {
            throw IllegalArgumentException("Invalid name")
        }
        
        // Database operations
        saveToDatabase(user)
        
        // Network operations
        syncWithServer(user)
        
        // UI operations
        updateUI(user)
        
        // Logging
        logUserActivity(user)
        
        // Email notifications
        sendNotificationEmail(user)
    }
    
    // All these should be separate classes/services
    private fun saveToDatabase(user: User) { /* DB logic */ }
    private fun syncWithServer(user: User) { /* Network logic */ }
    private fun updateUI(user: User) { /* UI logic */ }
    private fun logUserActivity(user: User) { /* Logging logic */ }
    private fun sendNotificationEmail(user: User) { /* Email logic */ }
}

// Poor Activity implementation
class MainActivity : AppCompatActivity() {
    
    // Direct view references instead of ViewBinding
    private var textView: TextView? = null
    
    // No proper lifecycle management
    private var backgroundJob: Job? = null
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // findViewById instead of ViewBinding
        textView = findViewById(R.id.text_view)
        
        // UI operations on background thread
        GlobalScope.launch {
            val data = fetchDataFromNetwork()
            // This is wrong - should use main dispatcher
            textView!!.text = data
        }
        
        // Memory leak - storing activity reference in companion object
        userRepository.staticContext = this
    }
    
    // Not canceling coroutines properly
    private fun fetchDataFromNetwork(): String {
        backgroundJob = GlobalScope.launch {
            // Long running operation without cancellation support
            repeat(1000000) {
                // Some heavy work
                Thread.sleep(1)
            }
        }
        return "Some data"
    }
    
    // Missing override
    fun onDestroy() {
        super.onDestroy()
        // Not cleaning up properly
    }
}

// Poor ViewModel implementation
class UserViewModel : ViewModel() {
    
    // Using var instead of val for immutable data
    var users: MutableList<User> = mutableListOf()
    
    // Not using LiveData or StateFlow
    fun loadUsers() {
        // Direct UI updates from ViewModel
        GlobalScope.launch {
            users = fetchUsers().toMutableList()
            // No way to notify UI about changes
        }
    }
    
    // No proper error handling
    private suspend fun fetchUsers(): List<User> {
        return withContext(Dispatchers.IO) {
            // This could fail but no error handling
            apiService.getUsers()
        }
    }
}

// Not using data class appropriately
class User {
    var name: String? = null
    var email: String? = null
    var age: Int? = null
    
    // Manual equals and hashCode instead of data class
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is User) return false
        return name == other.name && email == other.email
    }
    
    override fun hashCode(): Int {
        return name.hashCode() + email.hashCode()
    }
}

// Should use sealed class instead of enum with when
enum class UserType {
    ADMIN, USER, GUEST
}

fun handleUserType(type: UserType): String {
    // Missing else case - not exhaustive
    return when (type) {
        UserType.ADMIN -> "Admin user"
        UserType.USER -> "Regular user"
        // Missing GUEST case
    }
}

// Poor singleton implementation
class DatabaseHelper {
    companion object {
        // Not thread-safe singleton
        var instance: DatabaseHelper? = null
        
        fun getInstance(): DatabaseHelper {
            if (instance == null) {
                instance = DatabaseHelper() // Race condition possible
            }
            return instance!!
        }
    }
}

// Poor coroutine usage
class DataService {
    
    // Blocking calls in suspend function
    suspend fun getData(): String {
        Thread.sleep(1000) // Should use delay()
        return "data"
    }
    
    // Not using proper dispatcher
    fun processData() {
        GlobalScope.launch {
            // CPU intensive work on Default dispatcher is wrong
            repeat(1000000) {
                calculateSomething()
            }
        }
    }
    
    private fun calculateSomething() {
        // Heavy computation
    }
}

// Magic numbers and strings everywhere
class ConfigManager {
    fun getTimeout(): Long = 5000 // Magic number
    fun getBaseUrl(): String = "https://api.example.com" // Hard-coded string
    fun getMaxRetries(): Int = 3 // Magic number
}

// Poor extension function
fun String?.isNotNullOrEmpty(): Boolean {
    return this != null && this.isNotEmpty() // Redundant, stdlib has this
}

// Global mutable state
var globalCounter = 0
var globalUserList = mutableListOf<User>()

// Poor exception handling
fun riskyOperation(): String {
    return try {
        performNetworkCall()
    } catch (e: Exception) {
        // Generic catch-all
        "error"
    }
}

private fun performNetworkCall(): String {
    throw RuntimeException("Network error")
}

private fun readFileContent(path: String): String {
    throw RuntimeException("File not found")
}

private fun fetchUserFromApi(id: String): User? {
    return null // Simulating API failure
}

// Mock API service for compilation
object apiService {
    suspend fun getUsers(): List<User> = emptyList()
} 
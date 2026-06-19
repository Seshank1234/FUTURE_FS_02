// 1. Initialize Supabase correctly
const supabaseUrl = 'https://ifujxrvbgltilyrdezlh.supabase.co';
const supabaseKey = 'sb_publishable_uN4x9Rl2K7jOprK4QWHkjQ_hYZSr4kK';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 2. Updated saveLead function
async function saveLead() {
    // Collect all values based on the IDs in your index.html
    const leadData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        source: document.getElementById('source').value,
        status: document.getElementById('status').value,
        notes: document.getElementById('notes').value
    };

    // Perform the insert
    const { data, error } = await supabase
        .from('leads')
        .insert([leadData]);
    
    if (error) {
        console.error("Error saving:", error.message);
        alert("Error: " + error.message);
    } else {
        console.log("Success! Data saved.");
        alert("Lead added successfully!");
        location.reload(); // Refresh the page to show the new lead
    }
}
# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_arsproject_session',
  :secret      => '09afe35a16be6f4dca2844014a754788f25157fb655b07b7de5b423d646f5440b5330d32f1fe12f87f5d5095b1cd79ea9ed59853fe3157a40e2d91be0222be4b'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store

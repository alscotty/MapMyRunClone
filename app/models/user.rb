class User < ApplicationRecord

  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, message:'must be at least 6 characters' }, allow_nil: true

  after_initialize :ensure_session_token

  has_many :routes,
  foreign_key: :user_id,
  class_name: :Route

  has_many :workouts,
  foreign_key: :user_id,
  class_name: :Workout

     has_many :comments,
    foreign_key: :creator_id,
    class_name: :Comment


  #follows
   has_many :in_follows,
    foreign_key: :followee_id,
    class_name: :Follow

  has_many :out_follows,
    foreign_key: :follower_id,
    class_name: :Follow

  has_many :followers,
    through: :in_follows,
    source: :follower

  has_many :followees,
    through: :out_follows,
    source: :followee

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    generate_unique_session_token
    save!
    self.session_token
  end

  private

  def ensure_session_token
    generate_unique_session_token unless self.session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def generate_unique_session_token
    self.session_token = new_session_token
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
    self.session_token
  end

end

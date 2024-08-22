const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('general_settings', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    site_lang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    multilingual_system: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    theme_mode: {
      type: DataTypes.STRING(25),
      allowNull: true,
      defaultValue: "light"
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    logo_footer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    logo_email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    favicon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    show_hits: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    show_rss: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    rss_content_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "'summary'"
    },
    show_newsticker: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    pagination_per_page: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 10
    },
    google_analytics: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mail_service: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "swift"
    },
    mail_protocol: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "smtp"
    },
    mail_encryption: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "tls"
    },
    mail_host: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mail_port: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "587"
    },
    mail_username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mail_password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mail_title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mail_reply_to: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "noreply@domain.com"
    },
    mailjet_api_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mailjet_secret_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mailjet_email_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    google_client_id: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    google_client_secret: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    vk_app_id: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    vk_secure_key: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    facebook_app_id: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    facebook_app_secret: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    facebook_comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    facebook_comment_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    show_featured_section: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    show_latest_posts: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    pwa_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    registration_system: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    post_url_structure: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "'slug'"
    },
    comment_system: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    comment_approval_system: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    show_post_author: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    show_post_date: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    menu_limit: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 8
    },
    custom_header_codes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    custom_footer_codes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    adsense_activation_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    recaptcha_site_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    recaptcha_secret_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    emoji_reactions: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    mail_contact_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    mail_contact: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cache_system: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    cache_refresh_time: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1800
    },
    refresh_cache_database_changes: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    email_verification: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    file_manager_show_files: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    audio_download_button: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    approve_added_user_posts: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    approve_updated_user_posts: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    timezone: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "America\/New_York"
    },
    show_latest_posts_on_slider: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    show_latest_posts_on_featured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    sort_slider_posts: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "by_slider_order"
    },
    sort_featured_posts: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "by_featured_order"
    },
    newsletter_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    newsletter_popup: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    show_home_link: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    post_format_article: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    post_format_gallery: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    post_format_sorted_list: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    post_format_video: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    post_format_audio: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    post_format_trivia_quiz: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    post_format_personality_quiz: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    post_format_poll: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    maintenance_mode_title: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: "Coming Soon!"
    },
    maintenance_mode_description: {
      type: DataTypes.STRING(5000),
      allowNull: true
    },
    maintenance_mode_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    sitemap_frequency: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "monthly"
    },
    sitemap_last_modification: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "server_response"
    },
    sitemap_priority: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "automatically"
    },
    show_user_email_on_profile: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    reward_system_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    reward_amount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 1
    },
    currency_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "US Dollar"
    },
    currency_symbol: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "$"
    },
    currency_format: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "us"
    },
    currency_symbol_format: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "left"
    },
    payout_paypal_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    payout_iban_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    payout_swift_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    storage: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "local"
    },
    aws_key: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    aws_secret: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    aws_bucket: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    aws_region: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    auto_post_deletion: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    auto_post_deletion_days: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 30
    },
    auto_post_deletion_delete_all: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    redirect_rss_posts_to_original: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    image_file_format: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "'JPG'"
    },
    allowed_file_extensions: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: "'jpg,jpeg,png,gif,svg,csv,doc,docx,pdf,ppt,psd,mp4,mp3,zip'"
    },
    google_news: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    last_cron_update: {
      type: DataTypes.DATE,
      allowNull: true
    },
    version: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'general_settings',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

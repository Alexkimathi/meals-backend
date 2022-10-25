class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: [:index, :create, :show, :destroy]

  
    def index
        users = User.all
        render json: users
      end
    
        def create
    
            user = User.create!(user_params)
              if user.valid?
                session[:user_id] = user.id 
                render json: User, status: :created
              else
                render json: user.errors.full_messages, status: :unprocessable_entity
              end
          end
    
          def show
            if current_user
              render json: current_user, status: :ok
            else
              render json: "No current session stored", status: :unauthorized
            end
          end

          def destroy
            user = find_user;
            user.destroy;
            head :no_content
        end

        def find_user
            User.find_by(params[:id])
        end
    
          def authenticate_user
            return render json: { error: "Not authorized" }, status: :unauthorized unless current_user
          end
    
    
        def user_params
            params.permit(:username, :email, :password, :confirmation_password)
        end
end
